import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

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
    this.camera.position.z = 20;

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private setupModels() {
    const geomBox = new THREE.BoxGeometry(1);
    const material = new THREE.MeshStandardMaterial();
    const box = new THREE.Mesh(geomBox, material);

    const matrixS = new THREE.Matrix4().makeScale(0.5, 0.5, 0.5);
    const matrixR = new THREE.Matrix4().makeRotationX(
      THREE.MathUtils.degToRad(45)
    );
    const matrixT = new THREE.Matrix4().makeTranslation(0, 2, 0);

    // 매트릭스 행렬을 만들어 적용하는 것은 코드 순서대로 실행돼서 예기치 못한 결과를 불러올 수 있다
    // box.applyMatrix4(matrixS);
    // box.applyMatrix4(matrixR);
    // box.applyMatrix4(matrixT);

    // 아래 방식은 three.js 내부에서 scale > rotate > position 순으로 실행되게 하므로 순서에 영향을 받지 않음
    box.rotation.x = THREE.MathUtils.degToRad(45);
    box.position.set(0, 2, 0);
    box.scale.set(0.5, 0.5, 0.5);

    this.scene.add(box);

    const axesOfScene = new THREE.AxesHelper(5);
    this.scene.add(axesOfScene);
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
