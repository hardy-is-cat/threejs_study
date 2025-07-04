import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import {
  TTFLoader,
  Font,
  OrbitControls,
  ThreeMFLoader,
  TextGeometry,
} from "three/examples/jsm/Addons.js";

interface IGeometryHelper {
  createGeometry: () => THREE.BufferGeometry;
  createGUI: (update: () => void) => void;
}

class BoxGeometryHelper implements IGeometryHelper {
  private args = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  };

  createGeometry() {
    return new THREE.BoxGeometry(...Object.values(this.args));
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "width", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "height", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "depth", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "widthSegments", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "heightSegments", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "depthSegments", 0.1, 10, 0.01).onChange(update);
  }
}

class CircleGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    segments: 32,
    thetaStart: 0,
    thetaLength: 360,
  };

  createGeometry() {
    return new THREE.CircleGeometry(
      this.args.radius,
      this.args.segments,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "segments", 1, 64, 1).onChange(update);
    gui.add(this.args, "thetaStart", 0, 360, 0.1).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360, 0.1).onChange(update);
  }
}

class ConeGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 0.5,
    height: 1,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 360,
  };

  createGeometry() {
    return new THREE.ConeGeometry(
      this.args.radius,
      this.args.height,
      this.args.radialSegments,
      this.args.heightSegments,
      this.args.openEnded,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "height", 0.1, 2, 0.01).onChange(update);
    gui.add(this.args, "radialSegments", 1, 64, 1).onChange(update);
    gui.add(this.args, "heightSegments", 1, 64, 1).onChange(update);
    gui.add(this.args, "openEnded").onChange(update);
    gui.add(this.args, "thetaStart", 0, 360, 0.1).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360, 0.1).onChange(update);
  }
}

class CylinderGeometryHelper implements IGeometryHelper {
  private args = {
    radiusTop: 0.5,
    radiusBottom: 0.5,
    height: 1,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 360,
  };

  createGeometry() {
    return new THREE.CylinderGeometry(
      this.args.radiusTop,
      this.args.radiusBottom,
      this.args.height,
      this.args.radialSegments,
      this.args.heightSegments,
      this.args.openEnded,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radiusTop", 0, 2, 0.01).onChange(update);
    gui.add(this.args, "radiusBottom", 0, 2, 0.01).onChange(update);
    gui.add(this.args, "height", 1, 2, 0.01).onChange(update);
    gui.add(this.args, "radialSegments", 3, 64, 1).onChange(update);
    gui.add(this.args, "heightSegments", 1, 64, 1).onChange(update);
    gui.add(this.args, "openEnded").onChange(update);
    gui.add(this.args, "thetaStart", 0, 360).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360).onChange(update);
  }
}

class TorusGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    tube: 0.3,
    radialSegments: 16,
    tubularSegments: 100,
    arc: 360,
  };

  createGeometry() {
    return new THREE.TorusGeometry(
      this.args.radius,
      this.args.tube,
      this.args.radialSegments,
      this.args.tubularSegments,
      THREE.MathUtils.degToRad(this.args.arc)
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.1, 2, 0.01).onChange(update);
    gui.add(this.args, "tube", 0.1, 2, 0.01).onChange(update);
    gui.add(this.args, "radialSegments", 2, 30, 1).onChange(update);
    gui.add(this.args, "tubularSegments", 3, 200, 1).onChange(update);
    gui.add(this.args, "arc", 0.1, 360).onChange(update);
  }
}

class SphereGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    widthSegments: 32,
    heightSegments: 16,
    phiStart: 0,
    phiLength: 360,
    thetaStart: 0,
    thetaLength: 180,
  };

  createGeometry() {
    return new THREE.SphereGeometry(
      this.args.radius,
      this.args.widthSegments,
      this.args.heightSegments,
      THREE.MathUtils.degToRad(this.args.phiStart),
      THREE.MathUtils.degToRad(this.args.phiLength),
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.5, 2, 0.01).onChange(update);
    gui.add(this.args, "widthSegments", 3, 64, 1).onChange(update);
    gui.add(this.args, "heightSegments", 2, 32, 1).onChange(update);
    gui.add(this.args, "phiStart", 0, 360).onChange(update);
    gui.add(this.args, "phiLength", 0, 360).onChange(update);
    gui.add(this.args, "thetaStart", 0, 180).onChange(update);
    gui.add(this.args, "thetaLength", 0, 180).onChange(update);
  }
}

class RingGeometryHelper implements IGeometryHelper {
  private args = {
    innerRadius: 0.5,
    outerRadius: 1,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: 360,
  };

  createGeometry() {
    return new THREE.RingGeometry(
      this.args.innerRadius,
      this.args.outerRadius,
      this.args.thetaSegments,
      this.args.phiSegments,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "innerRadius", 0.1, 2).onChange(update);
    gui.add(this.args, "outerRadius", 0.1, 2).onChange(update);
    gui.add(this.args, "thetaSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "phiSegments", 1, 30, 2).onChange(update);
    gui.add(this.args, "thetaStart", 0, 360).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360).onChange(update);
  }
}

class PlaneGeometryHelper implements IGeometryHelper {
  private args = {
    width: 1,
    height: 1,
    widthSegments: 1,
    heightSegments: 1,
  };

  createGeometry() {
    return new THREE.PlaneGeometry(...Object.values(this.args));
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "width", 1, 30).onChange(update);
    gui.add(this.args, "height", 1, 30).onChange(update);
    gui.add(this.args, "widthSegments", 1, 30).onChange(update);
    gui.add(this.args, "heightSegments", 1, 30).onChange(update);
  }
}

class TorusKnotGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 0.8,
    tube: 0.25,
    tubularSegments: 64,
    radialSegments: 8,
    p: 2,
    q: 3,
  };

  createGeometry() {
    return new THREE.TorusKnotGeometry(...Object.values(this.args));
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.1, 2).onChange(update);
    gui.add(this.args, "tube", 0.1, 1).onChange(update);
    gui.add(this.args, "tubularSegments", 3, 300, 1).onChange(update);
    gui.add(this.args, "radialSegments", 3, 20, 1).onChange(update);
    gui.add(this.args, "p", 1, 20, 1).onChange(update);
    gui.add(this.args, "q", 1, 20, 1).onChange(update);
  }
}

class ShapeGeometryHelper implements IGeometryHelper {
  private args = {
    segments: 12,
    deg: 0,
  };

  createGeometry() {
    const shape = new THREE.Shape();
    // 펜을 가지고 도형을 그린다고 생각하면 됨
    // const length = 1.2;
    // const width = 0.8;
    // shape.moveTo(0, 0);
    // shape.lineTo(0, width);
    // shape.lineTo(length, width);
    // shape.lineTo(length, 0);
    // shape.lineTo(0, 0);
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const geometry = new THREE.ShapeGeometry(shape, this.args.segments);
    geometry.center();
    geometry.scale(0.1, 0.1, 0.1);
    geometry.rotateZ(THREE.MathUtils.degToRad(this.args.deg));

    return geometry;
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "segments", 1, 100, 1).onChange(update);
    gui.add(this.args, "deg", 0, 360, 1).onChange(update);
  }
}

class ExtrudeGeometryHelper implements IGeometryHelper {
  private args = {
    steps: 2,
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    curveSegments: 12,
    bevelSegments: 1,
  };

  createGeometry() {
    const x = 0;
    const y = 0;
    const shape = new THREE.Shape();
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const geometry = new THREE.ExtrudeGeometry(shape, this.args);
    geometry.center();
    geometry.scale(0.1, -0.1, 1);

    return geometry;
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "steps", 1, 10, 1).onChange(update);
    gui.add(this.args, "depth", 0, 2, 0.01).onChange(update);
    gui.add(this.args, "bevelThickness", 0, 1, 0.01).onChange(update);
    gui.add(this.args, "bevelSize", 0, 1, 0.01).onChange(update);
    gui.add(this.args, "bevelOffset", -4, 5, 0.01).onChange(update);
    gui.add(this.args, "curveSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "bevelSegments", 1, 32, 1).onChange(update);
  }
}

class TextGeometryHelper implements IGeometryHelper {
  private args = {
    text: "하디최고",
    size: 0.5,
    height: 0.1,
    curveSegments: 2,
    bevelSegments: 3,
    bevelThickness: 0.1,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelEnabled: true,
  };

  // 텍스트를 출력하기 위해선 폰트가 필요함
  private font: Font;

  constructor(font: Font) {
    this.font = font;
  }

  createGeometry() {
    const geometry = new TextGeometry(this.args.text, {
      font: this.font,
      ...this.args,
    });
    geometry.center();
    return geometry;
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "text").onChange(update);
    gui.add(this.args, "size", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "height", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "curveSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "bevelSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "bevelThickness", 0.01, 1, 0.001).onChange(update);
    gui.add(this.args, "bevelSize", 0.01, 1, 0.001).onChange(update);
    gui.add(this.args, "bevelOffset", -1, 1, 0.001).onChange(update);
    gui.add(this.args, "bevelEnabled").onChange(update);
  }
}

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private cube?: THREE.Mesh;

  constructor() {
    console.log("Hello three.js");

    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 1, 3.5);

    this.setupCamera();
    this.setupLight();
    this.setupHelpers();
    this.setupModels();
    this.setupEvents();
    this.setupControls();
  }

  private setupCamera() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 2;
  }

  private setupLight() {
    const lights = [];
    for (let i = 0; i < 3; i++) {
      lights[i] = new THREE.DirectionalLight(0xffffff, 3);
      this.scene.add(lights[i]);
    }

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
  }

  private setupHelpers() {
    const axes = new THREE.AxesHelper(10);
    this.scene.add(axes);

    const grid = new THREE.GridHelper(5, 20, 0xffffff, 0x444444);
    grid.position.y = -0.2;
    this.scene.add(grid);
  }

  private async setupModels() {
    // 면에 대한 mesh 객체
    const meshMaterial = new THREE.MeshPhongMaterial({
      color: 0x5588cc,
      flatShading: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });

    // 외곽선에 대한 객체
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    // const geometryHelper = new BoxGeometryHelper();
    // const geometryHelper = new CircleGeometryHelper();
    // const geometryHelper = new ConeGeometryHelper();
    // const geometryHelper = new CylinderGeometryHelper();
    // const geometryHelper = new TorusGeometryHelper();
    // const geometryHelper = new SphereGeometryHelper();
    // const geometryHelper = new RingGeometryHelper();
    // const geometryHelper = new PlaneGeometryHelper();
    // const geometryHelper = new TorusKnotGeometryHelper();
    // const geometryHelper = new ShapeGeometryHelper();
    // const geometryHelper = new ExtrudeGeometryHelper();
    const json = await new TTFLoader().loadAsync("./GowunDodum-Regular.ttf");
    const font = new Font(json);
    const geometryHelper = new TextGeometryHelper(font);

    const createModel = () => {
      const geometry = geometryHelper.createGeometry();

      // 모델의 면을 표현하는 mesh
      const mesh = new THREE.Mesh(geometry, meshMaterial);

      // 모델의 선을 표현하는 mesh
      const line = new THREE.LineSegments(
        // 모든 선을 표현하는 geometry
        new THREE.WireframeGeometry(geometry),
        // 면에 있는 선은 제외한 모서리의 선만 표현하는 geometry
        // new THREE.EdgesGeometry(geometry),
        lineMaterial
      );

      const group = new THREE.Group();
      group.name = "myModel";
      group.add(mesh, line);

      const oldGroup = this.scene.getObjectByName("myModel");
      if (oldGroup) {
        // dispose() => 더이상 사용하지 않을 이전 group에 대해 GPU에서 메모리를 회수하는 메서드
        (oldGroup.children[0] as THREE.Mesh).geometry.dispose();
        (oldGroup.children[1] as THREE.LineSegments).geometry.dispose();
        this.scene.remove(oldGroup);
      }

      this.scene.add(group);
    };

    createModel();

    geometryHelper.createGUI(createModel);
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

  private setupControls() {
    // 마우스 드래그로 객체를 움직일 수 있는 클래스
    // 매개변수로는 카메라와 마우스 움직임을 받아올 DOM 객체를 넣어줌
    new OrbitControls(this.camera!, this.domApp as HTMLElement);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s

    // group에 지정해둔 이름으로 찾아오는 메서드(getElementById 비슷한듯)
    // const cube = this.scene.getObjectByName("myModel");
    // if (cube) {
    //   cube.rotation.x = time;
    //   cube.rotation.y = time;
    // }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
