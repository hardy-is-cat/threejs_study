import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
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
    this.camera.position.z = 8;

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
    const texture = textureLoader.load("./uv_grid_opengl.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;

    // texture를 반복할 수 있게 함
    texture.repeat.x = 1;
    texture.repeat.y = 1;
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    // texture가 시작되는 위치를 변경
    texture.offset.x = 0;
    texture.offset.y = 0;

    // texture를 회전
    // texture.rotation = THREE.MathUtils.degToRad(45);

    // texture의 중심점을 변경
    // texture.center.x = 0.5;
    // texture.center.y = 0.5;

    // texture가 원래 크기보다 크게 표현될 때 사용
    // THREE.NearestFilter를 사용하면 확대 했을 때도 색상이 뭉게지지 않음, 가장 가까운 픽셀의 색상을 가져와서 표현함
    texture.magFilter = THREE.LinearFilter;
    // texture가 원래 크기보다 작게 표현될 때 사용
    // threejs에서 자동으로 텍스쳐에 대한 mipmap을 만들어줌
    // texture.minFilter = THREE.NearestMipmapLinearFilter;
    // texture.minFilter = THREE.NearestFilter;
    // texture.minFilter = THREE.LinearFilter;
    // texture.minFilter = THREE.NearestMipmapNearestFilter;
    texture.minFilter = THREE.LinearMipmapNearestFilter;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });

    const geomBox = new THREE.BoxGeometry(1, 1, 1);
    const box = new THREE.Mesh(geomBox, material);
    box.position.x = -1;
    this.scene.add(box);

    const geomSphere = new THREE.SphereGeometry(0.6);
    const sphere = new THREE.Mesh(geomSphere, material);
    sphere.position.x = 1;
    this.scene.add(sphere);
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
