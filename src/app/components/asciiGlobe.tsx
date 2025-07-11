

export class ASCIIGlobe {
  private canvas: string[][];
  private width: number;
  private height: number;
  private radius: number;
  private rotation: number = 0;
  private tilt: number = 0.3;
  private zoom: number = 1.0;
  private autoRotate: boolean = true;
  private characters = ' .·:+=#@█';

  setRotation(rotation: number) {
    this.rotation = rotation;
  }

  setAutoRotate(autoRotate: boolean) {
    this.autoRotate = autoRotate;
  }

  getAutoRotate(): boolean {
    return this.autoRotate;
  }

  setZoom(zoom: number) {
    this.zoom = Math.max(0.8, Math.min(2.0, zoom));
  }

  getZoom(): number {
    return this.zoom;
  }

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.radius = Math.min(width, height) * 0.4;
    this.canvas = Array(height).fill(null).map(() => Array(width).fill(' '));
  }

  private latLngTo3D(lat: number, lng: number, rotation: number): { x: number; y: number; z: number } {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + rotation) * Math.PI / 180;

    const x = this.radius * Math.sin(phi) * Math.cos(theta) * this.zoom;
    const y = this.radius * Math.cos(phi) * this.zoom;
    const z = this.radius * Math.sin(phi) * Math.sin(theta) * this.zoom;

    const tiltedY = y * Math.cos(this.tilt) - z * Math.sin(this.tilt);
    const tiltedZ = y * Math.sin(this.tilt) + z * Math.cos(this.tilt);

    return { x, y: tiltedY, z: tiltedZ };
  }

  private project3DTo2D(x: number, y: number, z: number): { x: number; y: number; visible: boolean } {
    const screenX = Math.round(x + this.width / 2);
    const screenY = Math.round(-y + this.height / 2);
    const visible = z > -this.radius * 0.8 * this.zoom;

    return { x: screenX, y: screenY, visible };
  }

  clear() {
    this.canvas = Array(this.height).fill(null).map(() => Array(this.width).fill(' '));
  }

  drawGlobe() {
    // Draw the globe sphere with higher resolution
    for (let lat = -90; lat <= 90; lat += 2) {
      for (let lng = -180; lng <= 180; lng += 2) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          const brightness = Math.max(0, Math.min(1, (z + this.radius * this.zoom) / (2 * this.radius * this.zoom)));
          
          const isLand = this.isDetailedLandmass(lat, lng);
          const isCoastline = this.isCoastline(lat, lng);
          const elevation = this.getElevation(lat, lng);
          
          if (isCoastline) {
            this.canvas[screenY][screenX] = brightness > 0.3 ? '≈' : '~';
          } else if (isLand) {
            if (elevation > 0.7) {
              this.canvas[screenY][screenX] = brightness > 0.3 ? '▲' : '^';
            } else if (elevation > 0.4) {
              this.canvas[screenY][screenX] = brightness > 0.3 ? '█' : '▓';
            } else {
              this.canvas[screenY][screenX] = brightness > 0.3 ? '▓' : '░';
            }
          } else {
            // Ocean with wave patterns
            const wavePattern = (Math.sin(lat * 0.1 + lng * 0.1) > 0);
            this.canvas[screenY][screenX] = brightness > 0.3 ? (wavePattern ? '~' : '≈') : '·';
          }
        }
      }
    }

    // Draw latitude lines (more detailed)
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lng = -180; lng <= 180; lng += 1) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          if (this.canvas[screenY][screenX] === ' ' || this.canvas[screenY][screenX] === '·') {
            this.canvas[screenY][screenX] = '·';
          }
        }
      }
    }

    // Draw longitude lines (more detailed)
    for (let lng = -180; lng <= 180; lng += 15) {
      for (let lat = -90; lat <= 90; lat += 1) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          if (this.canvas[screenY][screenX] === ' ' || this.canvas[screenY][screenX] === '·') {
            this.canvas[screenY][screenX] = '·';
          }
        }
      }
    }

    // Draw equator and prime meridian
    for (let i = -180; i <= 180; i += 1) {
      // Equator
      const { x, y, z } = this.latLngTo3D(0, i, this.rotation);
      const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);
      if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
        if (this.canvas[screenY][screenX] === ' ' || this.canvas[screenY][screenX] === '·') {
          this.canvas[screenY][screenX] = '=';
        }
      }

      // Prime meridian
      const pm = this.latLngTo3D(i / 2, 0, this.rotation);
      const pmScreen = this.project3DTo2D(pm.x, pm.y, pm.z);
      if (pmScreen.visible && pmScreen.x >= 0 && pmScreen.x < this.width && pmScreen.y >= 0 && pmScreen.y < this.height) {
        if (this.canvas[pmScreen.y][pmScreen.x] === ' ' || this.canvas[pmScreen.y][pmScreen.x] === '·') {
          this.canvas[pmScreen.y][pmScreen.x] = '|';
        }
      }
    }
  }

  // More detailed landmass detection with coastlines
  private isDetailedLandmass(lat: number, lng: number): boolean {
    // North America with more detail
    if (lat > 15 && lat < 75 && lng > -170 && lng < -50) {
      // Exclude Gulf of Mexico
      if (lat < 30 && lat > 18 && lng > -98 && lng < -80) return false;
      // Exclude Hudson Bay
      if (lat > 50 && lat < 65 && lng > -95 && lng < -75) return false;
      return true;
    }
    
    // South America with detail
    if (lat > -55 && lat < 15 && lng > -85 && lng < -35) {
      // Narrow at Panama
      if (lat > 5 && lat < 10 && lng < -80) return true;
      if (lat > -5 && lat < 5 && lng > -70) return true;
      return true;
    }
    
    // Europe with Mediterranean
    if (lat > 35 && lat < 72 && lng > -25 && lng < 60) {
      // Mediterranean Sea
      if (lat > 30 && lat < 45 && lng > -5 && lng < 35) {
        if (lat < 38) return false;
        if (lat < 42 && lng > 10 && lng < 30) return false;
      }
      return true;
    }
    
    // Africa with detail
    if (lat > -35 && lat < 38 && lng > -20 && lng < 55) {
      // Red Sea
      if (lat > 12 && lat < 30 && lng > 32 && lng < 44) return false;
      return true;
    }
    
    // Asia with detail
    if (lat > -10 && lat < 75 && lng > 25 && lng < 180) {
      // Exclude major water bodies
      if (lat > 30 && lat < 50 && lng > 45 && lng < 60) return false; // Caspian Sea
      return true;
    }
    
    // Australia
    if (lat > -45 && lat < -10 && lng > 110 && lng < 155) {
      return true;
    }
    
    // Indonesia
    if (lat > -10 && lat < 10 && lng > 95 && lng < 140) {
      if ((lng > 100 && lng < 110) || (lng > 115 && lng < 125) || (lng > 130 && lng < 135)) {
        return true;
      }
    }
    
    // New Zealand
    if (lat > -48 && lat < -34 && lng > 165 && lng < 179) {
      return true;
    }
    
    // Antarctica
    if (lat < -60) {
      return true;
    }

    return false;
  }

  private isCoastline(lat: number, lng: number): boolean {
    if (!this.isDetailedLandmass(lat, lng)) return false;
    
    // Check if any neighbor is water
    for (let dlat = -2; dlat <= 2; dlat += 2) {
      for (let dlng = -2; dlng <= 2; dlng += 2) {
        if (dlat === 0 && dlng === 0) continue;
        if (!this.isDetailedLandmass(lat + dlat, lng + dlng)) {
          return true;
        }
      }
    }
    return false;
  }

  private getElevation(lat: number, lng: number): number {
    // Himalayas
    if (lat > 25 && lat < 35 && lng > 75 && lng < 95) return 0.9;
    // Alps
    if (lat > 44 && lat < 48 && lng > 5 && lng < 15) return 0.8;
    // Rockies
    if (lat > 30 && lat < 50 && lng > -120 && lng < -100) return 0.7;
    // Andes
    if (lat > -55 && lat < 10 && lng > -75 && lng < -65) return 0.8;
    
    return 0.2;
  }

  drawMarker(lat: number, lng: number, symbol: string, highlight: boolean = false) {
    const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
    const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

    if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
      this.canvas[screenY][screenX] = symbol;

      if (highlight) {
        // Draw a cross pattern for highlight
        const positions = [
          [-1, 0], [1, 0], [0, -1], [0, 1]
        ];
        
        positions.forEach(([dx, dy]) => {
          const nx = screenX + dx;
          const ny = screenY + dy;
          if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
            if (this.canvas[ny][nx] === ' ' || this.canvas[ny][nx] === '·' || this.canvas[ny][nx] === '~') {
              this.canvas[ny][nx] = '+';
            }
          }
        });
      }
    }

    return { visible, screenX, screenY };
  }

  drawConnection(lat1: number, lng1: number, lat2: number, lng2: number) {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      
      // Great circle interpolation
      const lat = lat1 + (lat2 - lat1) * t;
      const lng = lng1 + (lng2 - lng1) * t;

      const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
      const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

      if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
        const current = this.canvas[screenY][screenX];
        if (current === ' ' || current === '·' || current === '~' || current === '≈') {
          this.canvas[screenY][screenX] = i % 4 === 0 ? '◦' : '·';
        }
      }
    }
  }

  rotate(delta: number) {
    this.rotation = (this.rotation + delta) % 360;
  }

  setTilt(tilt: number) {
    this.tilt = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, tilt));
  }

  toString(): string {
    return this.canvas.map(row => row.join('')).join('\n');
  }
}

export default ASCIIGlobe;