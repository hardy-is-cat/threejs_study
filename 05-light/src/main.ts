import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import {
  RectAreaLightUniformsLib,
  RectAreaLightHelper,
} from "three/examples/jsm/Addons.js";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  // DirectionalLight
  // private light?: THREE.DirectionalLight;
  // private lightHelper?: THREE.DirectionalLightHelper;

  // PointLight
  // private light?: THREE.PointLight;
  // private lightHelper?: THREE.PointLightHelper;

  // SpotLight
  // private light?: THREE.SpotLight;
  // private lightHelper?: THREE.SpotLightHelper;

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
    this.camera.position.set(2, 2, 3.5);

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    // AmbientLight(주변광,환경광): 빛의 색상과 강도를 매개변수로 받음
    // 장면에 존재하는 모든 물체에 대해 쉐이딩 없는 단순한 색상을 비춰줌
    // 보통 intensity를 약하게 추가하여 광원에 영향을 받지 않는 물체까지 보이게 함
    // const light = new THREE.AmbientLight("#fff", 10);

    // HemisphereLight(주변광): 위에서 비출 색상, 아래에서 비출 색상, 강도를 매개변수로 받음
    // const light = new THREE.HemisphereLight("#b0d8f5", "#bb7a1c", 1);

    // DirectionalLight: 일정한 방향으로 쏴주는 빛, 색상과 강도를 매개변수를 받음
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    // light.position.set(0, 1, 0);
    // this.light = light;
    // this.scene.add(light);

    // light.target.position.set(0, 0, 0);
    // this.scene.add(light.target);

    // const lightHelper = new THREE.DirectionalLightHelper(light);
    // this.lightHelper = lightHelper;
    // this.scene.add(lightHelper);

    // PointLight: 구모양으로 주변을 비추는 빛. 플로어등이랑 비슷한 느낌. 따라서 target 속성이 없음
    // 매개변수로 색상과 강도를 받음, distance란 속성으로 빛의 영향을 받는 거리를 설정할 수 있다
    // const light = new THREE.PointLight(0xffffff, 2);
    // light.position.set(0, 5, 0);
    // light.distance = 0;
    // this.light = light;
    // this.scene.add(light);

    // const lightHelper = new THREE.PointLightHelper(light);
    // this.lightHelper = lightHelper;
    // this.scene.add(lightHelper);

    // SpotLight: 무대위 조명처럼 한 점을 집중해서 비추는 빛, 매개변수로 색상과 강도를 받는다
    // SpotLight는 빛이 비치지 않는 곳과의 경계가 뚜렷함
    // angle 속성으로 광원이 만드는 깔대기의 범위를 0~90도 사이에서 조절할 수 있음. 작을수록 더 집중도가 높아짐.
    // penumbra 속성으로 빛의 감쇠율을 조절할 수 있음. 기본값 0, 최댓값 1
    // const light = new THREE.SpotLight(0xffffff, 10);
    // light.position.set(0, 3, 0);
    // light.target.position.set(0, 0, 0);
    // light.angle = THREE.MathUtils.degToRad(30);
    // light.penumbra = 0;
    // this.light = light;
    // this.scene.add(light);
    // this.scene.add(light.target);

    // const lightHelper = new THREE.SpotLightHelper(light);
    // this.lightHelper = lightHelper;
    // this.scene.add(lightHelper);

    // RectAreaLight: 창문이나 형광등을 통해서 비춰지는 빛, 색상, 강도, 가로길이, 세로길이를 매개변수로 받음
    // 초기화 후, 사용할 수 있으며, 각도를 조절해 빛을 비출 방향을 설정함
    RectAreaLightUniformsLib.init();
    const light = new THREE.RectAreaLight(0xffffff, 10, 2, 0.5);
    light.position.set(0, 3, 0);
    light.rotation.x = THREE.MathUtils.degToRad(-90);
    this.scene.add(light);

    const lightHelper = new RectAreaLightHelper(light);
    // this.lightHelper = lightHelper;
    this.scene.add(lightHelper);

    const gui = new GUI();
    gui.add(light, "intensity", 0, 20, 1);
    // gui.add(light, "distance", 0, 20, 1).onChange(() => lightHelper.update());
    // gui
    //   .add(light, "angle", 0, Math.PI / 2, 0.01)
    //   .onChange(() => lightHelper.update());
    // gui.add(light, "penumbra", 0, 1, 0.01).onChange(() => lightHelper.update());
    gui.add(light, "width", 0, 20, 1);
    gui.add(light, "height", 0, 10, 0.1);
  }

  private setupModels() {
    const axisHelper = new THREE.AxesHelper(10);
    this.scene.add(axisHelper);

    const geomGround = new THREE.PlaneGeometry(5, 5);
    const matGround = new THREE.MeshStandardMaterial({
      color: "#2c3e50",
      roughness: 0.5,
      metalness: 0.5,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(geomGround, matGround);
    ground.rotation.x = -THREE.MathUtils.degToRad(90);
    ground.position.y = -0.5;
    this.scene.add(ground);

    const geomBigSphere = new THREE.SphereGeometry(
      1,
      32,
      16,
      0,
      THREE.MathUtils.degToRad(360),
      0,
      THREE.MathUtils.degToRad(90)
    );
    const matBigSphere = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.1,
      metalness: 0.2,
    });
    const bigSphere = new THREE.Mesh(geomBigSphere, matBigSphere);
    bigSphere.position.y = -0.5;
    this.scene.add(bigSphere);

    const geomSmallSphere = new THREE.SphereGeometry(0.2);
    const matSmallSphere = new THREE.MeshStandardMaterial({
      color: "#e74c3c",
      roughness: 0.2,
      metalness: 0.5,
    });
    const smallSphere = new THREE.Mesh(geomSmallSphere, matSmallSphere);

    const smallSpherePivot = new THREE.Object3D();
    smallSpherePivot.add(smallSphere);
    bigSphere.add(smallSpherePivot);
    smallSphere.position.x = 2;
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot.position.y = 0.5;
    smallSpherePivot.name = "smallSpherePivot";

    const cntItems = 8;
    const geomTorus = new THREE.TorusGeometry(0.3, 0.1);
    const matTorus = new THREE.MeshStandardMaterial({
      color: "#9b59b6",
      roughness: 0.5,
      metalness: 0.9,
    });
    for (let i = 0; i < cntItems; i++) {
      const torus = new THREE.Mesh(geomTorus, matTorus);
      const torusPivot = new THREE.Object3D();

      bigSphere.add(torusPivot);
      torus.position.x = 2;
      torusPivot.position.y = 0.5;
      torusPivot.rotation.y = (THREE.MathUtils.degToRad(360) / cntItems) * i;
      torusPivot.add(torus);
    }
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

    const smallSpherePivot = this.scene.getObjectByName("smallSpherePivot");
    if (smallSpherePivot) {
      // smallSpherePivot.rotation.y = time;
      const euler = new THREE.Euler(0, time, 0);
      const quaterion = new THREE.Quaternion().setFromEuler(euler);
      smallSpherePivot.setRotationFromQuaternion(quaterion);

      //smallSpherePivot.quaternion.setFromEuler(euler);

      // smallSphere 객체를 가져와 월드 좌표계 위치를 얻고, 광원의 target 객체에 할당함
      const smallSphere = smallSpherePivot.children[0];

      // getWorldPosition(): 대상의 월드 좌표를 계산해서 매개변수로 오는 객체에 전달하는 메서드
      // DirectionalLight
      // smallSphere.getWorldPosition(this.light!.target.position);
      // this.lightHelper!.update();

      // PointLight
      // smallSphere.getWorldPosition(this.light!.position);
      // this.lightHelper!.update();

      // SpotLight
      // smallSphere.getWorldPosition(this.light!.target.position);
      // this.lightHelper!.update();
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
