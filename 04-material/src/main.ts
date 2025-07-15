import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

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
    // light.position.set(-1, 2, 4);
    // this.scene.add(light);
  }

  private setupModels() {
    // MeshBasicMaterial -> 지정된 색상 그대로 랜더링, 조명에 영향을 받지 않음
    const material = new THREE.MeshPhysicalMaterial({
      // MeshPhysicalMaterial: MeshStandardMaterial을 상속받는 더 발전된 재질
      // 코팅, 굴절률을 고려한 유리와 같은 투명도 설정이 가능, 비눗방울, 옷감(페브릭 등) 표현 가능
      // 연산이 많이 필요하기 때문에 적절히 사용해야함
      // clearcoat: 겉면에 코팅 효과를 줌
      // clearcoatRoughness: 코팅 효과의 거칠기
      clearcoat: 0,
      clearcoatRoughness: 0,
      // transmission: 투명한 정도
      // ior: 굴절률
      // thickness: 유리의 두께, 높아질수록 유리를 통해 보이는 상이 왜곡됨
      transmission: 0,
      ior: 1.5,
      thickness: 0.1,
      // sheen: 옷감의 실루엣
      // sheenRoughness: 실루엣의 빛나는 정도
      // sheenColor: 실루엣의 색상
      sheen: 0,
      sheenRoughness: 0,
      sheenColor: 0xffffff,

      // 오일 표현 or 비눗방울 표면을 나타낼 수 있는 속성
      // iridescence
      // iridescenceIOR
      // iridescenceThicknessRange: 두께값의 범위
      iridescence: 0,
      iridescenceIOR: 0,
      iridescenceThicknessRange: [100, 800],

      // MeshStandardMaterial: 좀 더 사실적인 랜더링을 가능하게 함
      // PBR(Physically Based Rendering) 재질, 거칠기와 금속성 제공
      // roughness: 거칠기에 대한 속성, 최댓값 1
      // metalness: 금속성, 최댓값 1
      roughness: 0,
      metalness: 0,

      // MeshLambertMaterial: 정점에서 광원의 영향을 계산함
      // color: 랜더링할 요소의 색상
      // emissive: 광원의 영향을 받지 않고 모델 자체에서 방출하는 색상
      // wireframe: 모델을 선으로 표현
      color: 0xff8877,
      emissive: 0x00000,
      wireframe: false,

      // MeshPhongMaterial: 매쉬가 랜더링되는 픽셀단위로 광원의 영향을 계산
      // specular: 광원에 의해 반사되는 색상
      // shininess: 의 반사되는 정도
      // flatShading: 매쉬를 이루는 면을 평평하게 랜더링 할 지 여부
      // specular: 0x0000ff,
      // shininess: 50,
      flatShading: false,

      // Material 클래스의 속성
      // visible: 랜더링시 보이게 할 지에 대한 속성
      // transparent: opacity 및 투명도 관련 속성 사용 여부에 대한 속성
      // depthTest, depthWrite: z버퍼와 관련된 속성
      // side: 3차원 객체를 구성하는 삼각형에 대해 앞면만 표현할 지 여부에 대한 속성
      //         광원의 영향을 받지 않는 material 객체에선 잘 알아볼 수 없다
      //         (기본값 FrontSide, BackSide와 DoubleSide도 존재)
      visible: true,
      transparent: false,
      opacity: 0.7,
      depthTest: true,
      depthWrite: true,
      side: THREE.FrontSide,
    });

    const gui = new GUI();
    gui.addColor(material, "color").onChange((v) => (material.color = v));
    gui.addColor(material, "emissive").onChange((v) => (material.emissive = v));
    gui.add(material, "roughness", 0, 1, 0.01);
    gui.add(material, "metalness", 0, 1, 0.01);
    gui.add(material, "clearcoat", 0, 1, 0.01);
    gui.add(material, "clearcoatRoughness", 0, 1, 0.01);
    gui.add(material, "transmission", 0, 1, 0.01);
    gui.add(material, "ior", 1, 2.333, 0.01);
    gui.add(material, "thickness", 0, 10, 0.01);
    gui.add(material, "sheen", 0, 1, 0.01);
    gui.add(material, "sheenRoughness", 0, 1, 0.01);
    gui
      .addColor(material, "sheenColor")
      .onChange((v) => (material.sheenColor = v));
    gui.add(material, "iridescence", 0, 1, 0.01);
    gui.add(material, "iridescenceIOR", 1, 2.333, 0.01);
    gui.add(material.iridescenceThicknessRange, "0", 1, 1000, 1);
    gui.add(material.iridescenceThicknessRange, "1", 1, 1000, 1);

    const geomCylinder = new THREE.CylinderGeometry(0.6, 0.9, 1.2, 64, 1);
    const cylinder = new THREE.Mesh(geomCylinder, material);
    cylinder.position.x = -1;
    this.scene.add(cylinder);

    const geoTorusknot = new THREE.TorusKnotGeometry(0.4, 0.18, 128, 64);
    const torusknot = new THREE.Mesh(geoTorusknot, material);
    torusknot.position.x = 1;
    this.scene.add(torusknot);
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
