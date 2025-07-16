import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  // private camera?: THREE.OrthographicCamera;

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

    // PerspectiveCamera
    // 매개변수로 화각(fov, 단위:deg), 카메라 화면비, zNear(절두체의 가까운점), zFar(절두체의 끝점)를 받는다
    // zNear, zFar 사이의 물체만 랜더링 함
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);

    // OrthographicCamera
    // const aspect = width / height;
    // this.camera = new THREE.OrthographicCamera(
    //   -1 * aspect, // xLeft: 절두체의 중심점으로부터 떨어진 왼쪽점(음수)
    //   1 * aspect, // xRight: 절두체의 중심점으로부터 떨어진 오른쪽점(양수)
    //   1, // yTop: 절두체의 중심점으로부터 떨어진 위쪽점(양수)
    //   -1, // yBottom: 절두체의 중심점으로부터 떨어진 아래쪽점(음수)
    //   0.1, // zNear: 카메라로부터 절두체까지의 가장 가까운점
    //   100 // zFar: 카메라로부터 절두체까지의 가장 먼점
    // );
    // this.camera.zoom = 0.3;

    this.camera.position.set(2, 2, 3.5);

    // lookAt(): 카메라가 바라볼 지점을 지정할 수 있음
    // OrbitControls와 같이 사용하게 될 경우 자동으로 바라볼 지점이 계산되므로 단독 사용해야 함
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
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

    // 카메라가 된 기존 smallSphere가 앞을 바라보게 하기 위해 새로운 smallSphere를 추가
    // 새로운 smallSphere를 기존 smallSphere 앞에 위치시켜 바라보게 하기 위함
    // const smallSphere2 = new THREE.Mesh(geomSmallSphere, matSmallSphere);
    const smallSphere2 = new THREE.Object3D();

    const smallSpherePivot2 = new THREE.Object3D();
    smallSpherePivot2.add(smallSphere2);
    bigSphere.add(smallSpherePivot2);
    smallSphere2.position.x = 2;
    smallSpherePivot2.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot2.position.y = 0.5;
    smallSpherePivot2.name = "targetSmallSpherePivot";

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
      // PerspectiveCamera를 위한 종횡비 조절
      camera.aspect = width / height;

      // OrthographicCamera를 위한 종횡비 조절
      // const aspect = width / height;
      // camera.left = -1 * aspect;
      // camera.right = 1 * aspect;

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

      // smallSpherePivot.quaternion.setFromEuler(euler);

      // 카메라가 smallSphere를 바라보게 하는 코드
      const smallSphere = smallSpherePivot.children[0];
      const target = new THREE.Vector3();
      smallSphere.getWorldPosition(target);
      // this.camera?.lookAt(target);

      // 카메라를 smallSphere에 위치시켜 앞을 바라보게 하는 코드
      // target(smallSphere)의 위치를 카메라의 위치에 복사함
      this.camera?.position.copy(target);
      const targetSmallSpherePivot = this.scene.getObjectByName(
        "targetSmallSpherePivot"
      );
      if (targetSmallSpherePivot) {
        // 새로 만든 smallSpherePivot을 기존 smallSpherePivot 조금 앞에 위치시킴
        // targetSmallSpherePivot.rotation.y = time + 0.5;
        const euler = new THREE.Euler(
          0,
          time + THREE.MathUtils.degToRad(30),
          0
        );
        const quaterion = new THREE.Quaternion().setFromEuler(euler);
        targetSmallSpherePivot.setRotationFromQuaternion(quaterion);

        // 기존 smallSpherePivot에 위치한 카메라가 새로 만든 smallSpherePivot을 바라보게 함
        const nextPosition = targetSmallSpherePivot.children[0];
        const cameraTarget = new THREE.Vector3();
        nextPosition.getWorldPosition(cameraTarget);

        this.camera?.lookAt(cameraTarget);
      }
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
