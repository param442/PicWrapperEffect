import * as THREE from 'three';
import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';
import gsap from 'gsap';

interface ImgStore {
  img: HTMLImageElement;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  top: number;
  left: number;
  height: number;
  width: number;
}

class Site {
  private content: HTMLDivElement;
  private width: number;
  private height: number;
  private images: HTMLImageElement[];
  private ImgStore: ImgStore[];
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private material!: THREE.ShaderMaterial;
  private startIndex: number;
  private endIndex: number;
  public time: number = 1;

  constructor({ content }: { content: HTMLDivElement }) {
    this.content = content;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.images = Array.from(this.content.querySelectorAll('.images img'));
    this.startIndex = 0;
    this.endIndex = 0;
    this.ImgStore = [];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 200; // Move camera back to view the images
    this.camera.fov = 2 * Math.atan(this.height / 2 / 200) * (180 / Math.PI);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.content.appendChild(this.renderer.domElement);

    this.addImages();
    this.hoverOverLinks();
    this.resize();
    this.setupResize();
    this.render();
  }

  resize() {
    this.width = this.content.offsetWidth;
    this.height = this.content.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.setPosition();
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  setPosition() {
    this.ImgStore.forEach(img => {
      const bound = img.img.getBoundingClientRect();
      img.mesh.position.y = -bound.top + this.height / 2 - bound.height / 2;
      img.mesh.position.x = bound.left - this.width / 2 + bound.width / 2;
    });
  }

  addImages() {
    const TextureLoader = new THREE.TextureLoader();
    const textures = this.images.map(img => TextureLoader.load(img.src));

    const uniforms = {
      uTime: { value: 0 },
      uTimeline: { value: 0.2 },
      uStartIndex: { value: 0 },
      uEndIndex: { value: 1 },
      uImage1: { value: textures[0] },
      uImage2: { value: textures[1] },
      uImage3: { value: textures[2] },
      uImage4: { value: textures[3] },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
    });

    this.images.forEach(img => {
      const bounds = img.getBoundingClientRect();
      const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height);
      const mesh = new THREE.Mesh(geometry, this.material);
      this.scene.add(mesh);
      this.ImgStore.push({
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        height: bounds.height,
        width: bounds.width,
      });
    });
  }
  hoverOverLinks() {
    const links = document.querySelectorAll('.links a');
    links.forEach((link, idx) => {
      link.addEventListener('mouseover', e => {
        this.material.uniforms.uTimeline.value = 0.0;
        gsap.to(this.material.uniforms.uTimeline, {
          value: 4.0,
          duration: 2,
          onStart: () => {
            this.endIndex = idx;
            this.material.uniforms.uStartIndex.value = this.startIndex;
            this.material.uniforms.uEndIndex.value = this.endIndex;
            this.material.uniforms.uStartIndex.value = this.endIndex;
          },
        });
      });
    });
  }
  render() {
    this.time += 0.01;
    this.renderer.render(this.scene, this.camera);
    this.material.uniforms.uTime.value = this.time;

    window.requestAnimationFrame(this.render.bind(this));
  }
}

export { Site };
