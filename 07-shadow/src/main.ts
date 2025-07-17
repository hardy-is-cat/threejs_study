import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  // private light?: THREE.DirectionalLight;
  // private lightHelper?: THREE.DirectionalLightHelper;
  // private light?: THREE.PointLight;
  // private lightHelper?: THREE.PointLightHelper;
  private light?: THREE.SpotLight;
  private lightHelper?: THREE.SpotLightHelper;

  constructor() {
    console.log("Hello three.js");

    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
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
    // new RGBELoader().load("./studio_small_08_4k.hdr", (texture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   this.scene.environment = texture;
    //   this.scene.background = texture;

    //   // 광원의 세기 조절
    //   // 여러가지 Tone Mapping modes가 있으니 해당 객체를 살펴보고 적당한 모드를 사용한다
    //   // 제일 많이 사용되는 것은 ACESFilmicToneMapping
    //   this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //   this.renderer.toneMappingExposure = 0.5;
    // });

    // DirectionalLight
    // const light = new THREE.DirectionalLight(0xffffff, 6);

    // light.castShadow = true;
    // // 카메라의 위치가 물체들과 너무 가까워 그림자가 잘리는 현상이 발생
    // // 그림자가 생성되는데 필요한 카메라(OrthographicCamera)의 절두체 크기를 키우거나 카메라 위치를 옮겨야함
    // // light.position.set(0, 1, 0);
    // light.position.set(0, 3, 0);
    // light.target.position.set(0, 0, 0);

    // // 그림자의 품질 설정
    // light.shadow.mapSize.set(2048, 2048);
    // // 그림자의 선명도 설정
    // light.shadow.radius = 20;

    // this.light = light;

    // this.scene.add(light.target);
    // this.scene.add(light);

    // PointLight
    // const light = new THREE.PointLight(0xffffff, 6);
    // light.castShadow = true;
    // light.position.set(0, 5, 0);
    // light.distance = 10;
    // this.scene.add(light);
    // this.light = light;

    // SpotLight
    const light = new THREE.SpotLight(0xffffff, 20);
    light.position.set(0, 3, 0);
    light.castShadow = true;
    light.target.position.set(0, 0, 0);
    light.angle = THREE.MathUtils.degToRad(20);
    light.penumbra = 0.1;
    this.scene.add(light);
    this.light = light;

    const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // this.scene.add(cameraHelper);

    // const lightHelper = new THREE.DirectionalLightHelper(light);
    // const lightHelper = new THREE.PointLightHelper(light);
    const lightHelper = new THREE.SpotLightHelper(light);
    this.lightHelper = lightHelper;
    this.scene.add(lightHelper);
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
    ground.receiveShadow = true;
    // ground는 자신의 그림자가 필요하지 않음
    ground.castShadow = true;
    ground.rotation.x = -THREE.MathUtils.degToRad(90);
    ground.position.y = -0.5;
    this.scene.add(ground);

    // const geomBigSphere = new THREE.SphereGeometry(
    //   1,
    //   32,
    //   16,
    //   0,
    //   THREE.MathUtils.degToRad(360),
    //   0,
    //   THREE.MathUtils.degToRad(90)
    // );
    // const matBigSphere = new THREE.MeshStandardMaterial({
    //   color: "#ffffff",
    //   roughness: 0.1,
    //   metalness: 0.2,
    // });
    // const bigSphere = new THREE.Mesh(geomBigSphere, matBigSphere);
    // bigSphere.position.y = -0.5;
    // this.scene.add(bigSphere);
    const geomTorusKnot = new THREE.TorusKnotGeometry(0.55, 0.15, 128, 64);
    const matBigTorusKnot = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.1,
      metalness: 0.2,
    });
    const bigTorusKnot = new THREE.Mesh(geomTorusKnot, matBigTorusKnot);
    // bigTorusKnot.receiveShadow = true;
    bigTorusKnot.castShadow = true;
    bigTorusKnot.position.y = 0.6;
    this.scene.add(bigTorusKnot);

    const geomSmallSphere = new THREE.SphereGeometry(0.2);
    const matSmallSphere = new THREE.MeshStandardMaterial({
      color: "#e74c3c",
      roughness: 0.2,
      metalness: 0.5,
    });
    const smallSphere = new THREE.Mesh(geomSmallSphere, matSmallSphere);
    smallSphere.receiveShadow = true;
    smallSphere.castShadow = true;

    const smallSpherePivot = new THREE.Object3D();
    smallSpherePivot.add(smallSphere);
    // bigSphere.add(smallSpherePivot);
    bigTorusKnot.add(smallSpherePivot);
    smallSphere.position.x = 2;
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot.position.y = -0.6;
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
      torus.receiveShadow = true;
      torus.castShadow = true;
      const torusPivot = new THREE.Object3D();

      // bigSphere.add(torusPivot);
      bigTorusKnot.add(torusPivot);
      torus.position.x = 2;
      torusPivot.position.y = -0.6;
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

      const smallSphere = smallSpherePivot.children[0];

      if (this.light instanceof THREE.DirectionalLight) {
        smallSphere.getWorldPosition(this.light.target.position);
        this.lightHelper?.update();
      }

      if (this.light instanceof THREE.PointLight) {
        smallSphere.getWorldPosition(this.light.position);
        this.lightHelper?.update();
      }

      if (this.light instanceof THREE.SpotLight) {
        smallSphere.getWorldPosition(this.light.target.position);
        this.lightHelper?.update();
      }
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
