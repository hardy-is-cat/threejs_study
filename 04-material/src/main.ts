import {
  OrbitControls,
  RGBELoader,
  VertexNormalsHelper,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  constructor() {
    console.log("Hello three.js");

    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();

    this.setupCamera();
    this.setupLight();
    this.setupModels();
    this.setupEvents();
  }

  private setupCamera() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 4;

    new OrbitControls(this.camera, domApp as HTMLElement);
  }

  private setupLight() {
    // HDRI 광원, MeshStandardMaterial과 사용 가능
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("./charolettenbrunn_park_4k.hdr", (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularRefractionMapping;
      this.scene.background = environmentMap;
      this.scene.environment = environmentMap;
    });

    // 디렉셔널 라이트
    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(1, 2, 1);
    // this.scene.add(light);
  }

  private setupModels() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load("./Glass_Window_002_basecolor.jpg");
    map.colorSpace = THREE.SRGBColorSpace;

    const mapAO = textureLoader.load("./Glass_Window_002_ambientOcclusion.jpg");
    const mapHeight = textureLoader.load("./Glass_Window_002_height.png");
    const mapNormal = textureLoader.load("./Glass_Window_002_normal.jpg");
    const mapRoughness = textureLoader.load("./Glass_Window_002_roughness.jpg");
    const mapMetalic = textureLoader.load("./Glass_Window_002_metallic.jpg");
    const mapAlpha = textureLoader.load("./Glass_Window_002_opacity.jpg");

    const material = new THREE.MeshStandardMaterial({
      map,
      normalMap: mapNormal,
      normalScale: new THREE.Vector2(1, 1),
      // geometry의 좌표를 법선벡터 방향으로 변형시켜 입체감을 표현, 픽셀값이 밝을수록 더 많이 움직임
      displacementMap: mapHeight,
      displacementScale: 0.2,
      displacementBias: -0.15,
      // 그림자
      aoMap: mapAO,
      aoMapIntensity: 1.5,
      // 픽셀의 밝고 어두움에 따라 거칠기를 표현, 픽셀이 밝을수록 더 거칠음
      roughnessMap: mapRoughness,
      roughness: 0.8,
      // 금속성을 표현, 픽셀이 밝을수록 더 금속같아짐
      metalnessMap: mapMetalic,
      metalness: 0.9,
      // 투명도를 표현, 픽셀값이 밝을수록 불투명
      alphaMap: mapAlpha,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const geomBox = new THREE.BoxGeometry(1, 1, 1, 256, 256, 256);
    const box = new THREE.Mesh(geomBox, material);
    box.position.x = -1;
    this.scene.add(box);

    const geomSphere = new THREE.SphereGeometry(0.6, 512, 256);
    const sphere = new THREE.Mesh(geomSphere, material);
    sphere.position.x = 1;
    this.scene.add(sphere);

    // normalvector를 표시하는 helper
    // const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
    // this.scene.add(boxHelper);

    // const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
    // this.scene.add(sphereHelper);
  }

  private setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
