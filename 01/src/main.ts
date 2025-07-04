import "./style.css";
import * as THREE from "three";

class App {
  // private 접근자로 App 클래스 내에서만 참조할 수 있도록 함
  // renderer : 장치에 출력하는 객체
  // scene : 3차원 모델과 빛으로 구성된 장면
  // camera : 장면을 어떤 관점에서 바라볼 지 결정함
  // cube : 3D 모델
  private renderer: THREE.WebGLRenderer;
  private domApp: Element;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private cube?: THREE.Mesh;
  private cubes?: THREE.Mesh[];

  constructor() {
    console.log("Hello three.js");

    // renderer 객체를 생성할 때 WebGLRenderer를 사용하겠다(WebGPURenderer도 있음 )
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // 고해상도 모니터에서 픽셀을 좀 더 많이 표현되게 설정
    // window.devicePixelRatio(현재 모니터의 픽셀 비율 프로퍼티)
    // Math.min을 이용해 비율을 2가 넘지 않게 함(2를 넘어봤자 사람 눈으로 구분도 안되면서 성능만 저하됨)
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.domApp = document.querySelector("#app")!;
    // 캔버스 타입의 DOM객체인 renderer를 #app의 자식으로 추가함
    this.domApp.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    // 카메라, 광원, 3D모델을 표현하는 메서드를 호출
    this.setupCamera();
    this.setupLight();
    this.setupModels();

    this.setupEvent();
  }

  private setupCamera() {
    // 카메라 렌즈의 가로에 대한 세로의 비율이 필요함
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    // PerspectiveCamera -> 카메라의 종류
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    // 카메라의 z 좌표 설정
    this.camera.position.z = 2;
  }

  // DirectionalLight -> 광원의 종류
  private setupLight() {
    // color : 빛의 색상
    // intensity : 빛의 강도
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    this.scene.add(light);
  }

  private setupModels() {
    // geometry : 3차원 모델의 형상, 매개변수는 가로, 세로, 깊이
    // material : 3차원 모델의 색상, 투명도도 정의 가능
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const ringGeometry = new THREE.TorusGeometry(0.5, 0.2);
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({
      color: 0x55aaff,
    });

    this.cubes = [
      this.makeModelInstance(geometry, 0x44aaff, 0),
      this.makeModelInstance(geometry, 0xff44aa, -1),
      this.makeModelInstance(geometry, 0xaaff44, 1),
    ];
    // this.cube = new THREE.Mesh(geometry, material);

    // this.scene.add(this.cube);
  }

  private makeModelInstance(
    geometry: THREE.BoxGeometry,
    color: number,
    x: number
  ) {
    const meterial = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, meterial);
    this.scene.add(cube);

    if (cube) cube.position.x = x;

    return cube;
  }

  // 이벤트를 처리하는 메서드
  private setupEvent() {
    this.resize();
    window.onresize = this.resize.bind(this);

    // setAnimationLoop로 render가 전달되면서 this를 찾지못해
    // render가 undefined가 될 수 있으므로
    // .bind(this)를 이용해 현재 클래스에 바인딩해줌
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  // 창의 크기가 변경되면 값을 계산하여 카메라에 비율을 다시 전달
  private resize() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  // 모델을 회전시키려면 회전에 대한 값을 계속 업데이트 해줘야함
  private update(time: number) {
    time *= 0.001; // ms -> s 변환

    const cube = this.cube;
    if (cube) {
      cube.rotation.x = time;
      cube.rotation.y = time;
      cube.rotation.z = time;
      // cube.rotateX(0.1);
      // cube.rotateY(0.2);
      // cube.rotateZ(0.2);
    }

    const cubes = this.cubes;
    if (cubes) {
      cubes.forEach((cube, idx) => {
        const speed = 1 + idx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
    }
  }

  // 위에서 만든 모든 것들을 표현해주는 메서드
  // time : setAnimationLoop의 호출에 의해 결정됨. 단위는 ms.
  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
