import type { DirectionalLight, Light, SpotLight, Vector3 } from "three";
import * as THREE from "three";
import type GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import type { min } from "three/webgpu";

export class ColorGUIHelper {
  object: any;
  prop: string;

  constructor(object: any, prop: string) {
    this.object = object;
    this.prop = prop;
  }

  get value(): string {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(hexString: string) {
    this.object[this.prop].set(hexString);
  }
}

class DegRadHelper {
  obj: any;
  prop: string;
  constructor(obj: any, prop: string) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return THREE.MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = THREE.MathUtils.degToRad(v);
  }
}

export const makeXYZGUI = (
  gui: GUI,
  vector3: Vector3,
  name: string,
  onChangeFn: any,
  min = -10,
  max = 10,
  step = 0.1
) => {
  const folder = gui.addFolder(name);
  folder.add(vector3, "x", min, max, step).onChange(onChangeFn);
  folder.add(vector3, "y", min, max, step).onChange(onChangeFn);
  folder.add(vector3, "z", min, max, step).onChange(onChangeFn);
  folder.open();
};

interface MaterialParams {
  color: THREE.Color;
  reflectivity: number;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  iridescence: number;
  iridescenceIOR: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: THREE.Color;
  anisotropy: number;
  transmission: number;
}

export const makeMaterialParamsGUI = (
  gui: GUI,
  material: THREE.MeshPhysicalMaterial,
  name: string,
  onChangeFn: any
) => {
  const folder = gui.addFolder(name);
  folder.addColor(new ColorGUIHelper(material, "color"), "value").name("color");
  folder.add(material, "reflectivity", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "roughness", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "metalness", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "clearcoat", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "clearcoatRoughness", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "iridescence", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "iridescenceIOR", 0, 5, 0.1).onChange(onChangeFn);
  folder.add(material, "sheen", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "sheenRoughness", 0, 1, 0.1).onChange(onChangeFn);
  folder
    .addColor(new ColorGUIHelper(material, "sheenColor"), "value")
    .name("sheenColor");
  folder.add(material, "anisotropy", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "transmission", 0, 1, 0.1).onChange(onChangeFn);
  folder.open();
};

export const makeMaterialGUI = (
  gui: GUI,
  material: THREE.MeshPhysicalMaterial,
  name: string,
  onChangeFn: any
) => {
  const folder = gui.addFolder(name);
  folder.addColor(new ColorGUIHelper(material, "color"), "value").name("color");
  folder.add(material, "reflectivity", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "roughness", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "metalness", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "clearcoat", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "clearcoatRoughness", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "iridescence", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "iridescenceIOR", 0, 5, 0.1).onChange(onChangeFn);
  folder.add(material, "sheen", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "sheenRoughness", 0, 1, 0.1).onChange(onChangeFn);
  folder
    .addColor(new ColorGUIHelper(material, "sheenColor"), "value")
    .name("sheenColor");
  folder.add(material, "anisotropy", 0, 1, 0.1).onChange(onChangeFn);
  folder.add(material, "transmission", 0, 1, 0.1).onChange(onChangeFn);
  folder.open();
};

interface SphereGeometryParams {
  radius: number;
  widthSegments: number;
  heightSegments: number;
  phiStart: number;
  phiLength: number;
}

export const makeGeometryGUI = (
  gui: GUI,
  geometry: SphereGeometryParams,
  name: string,
  onChangeFn: any
) => {
  const folder = gui.addFolder(name);
  folder.add(geometry, "radius", 1, 10, 1).onChange(onChangeFn);
  folder.add(geometry, "widthSegments", 0, 100, 1).onChange(onChangeFn);
  folder.add(geometry, "heightSegments", 0, 100, 1).onChange(onChangeFn);
  folder.add(geometry, "phiStart", 0, 10, 1).onChange(onChangeFn);
  folder.add(geometry, "phiLength", 0, 12, 1).onChange(onChangeFn);
  folder.open();
};

export const makeDirectionalLightGUI = (
  gui: GUI,
  light: DirectionalLight,
  name: string,
  onChangeFn: any,
  min = -10,
  max = 10,
  step = 0.1
) => {
  const folder = gui.addFolder(name);
  folder.add(light.position, "x", min, max, step).onChange(onChangeFn);
  folder.add(light.position, "y", min, max, step).onChange(onChangeFn);
  folder.add(light.position, "z", min, max, step).onChange(onChangeFn);
  folder.add(light.target.position, "x", min, max, step).onChange(onChangeFn);
  folder.add(light.target.position, "y", min, max, step).onChange(onChangeFn);
  folder.add(light.target.position, "z", min, max, step).onChange(onChangeFn);
  folder.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
  folder.add(light, "intensity", 0, 1000, 1);
  // folder.add({ reset: () => vector3.set(0, 0, 0) }, "reset");
  folder.open();
};

export const makeSpotLightGUI = (
  gui: GUI,
  light: SpotLight,
  name: string,
  onChangeFn: any,
  min = -10,
  max = 10,
  step = 0.1
) => {
  const folder = gui.addFolder(name);
  folder.add(light.position, "x", min, max, step).onChange(onChangeFn);
  folder.add(light.position, "y", min, max, step).onChange(onChangeFn);
  folder.add(light.position, "z", min, max, step).onChange(onChangeFn);
  folder.add(light.target.position, "x", min, max, step).onChange(onChangeFn);
  folder.add(light.target.position, "y", min, max, step).onChange(onChangeFn);
  folder.add(light.target.position, "z", min, max, step).onChange(onChangeFn);
  folder.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
  folder.add(light, "intensity", 0, 10000, 50).onChange(onChangeFn);
  folder.add(light, "distance", 0, 10000, 50).onChange(onChangeFn);
  folder
    .add(new DegRadHelper(light, "angle"), "value", 0, 90)
    .name("angle")
    .onChange(onChangeFn);
  folder.add(light, "penumbra", 0, 1, 0.1).onChange(onChangeFn);
  // folder.add({ reset: () => vector3.set(0, 0, 0) }, "reset");
  folder.open();
};

export const makeSpotlightHelper = (
  gui: GUI,
  light: SpotLight,
  name: string,
  scene: THREE.Scene
) => {
  const lightHelper = new THREE.SpotLightHelper(light, light.color);
  scene.add(lightHelper);
  makeSpotLightGUI(
    gui,
    light,
    name,
    () => {
      light.target.updateMatrixWorld();
      lightHelper.update();
    },
    -800,
    800,
    1
  );
};

export const makeDirectionalLightHelper = (
  gui: GUI,
  light: DirectionalLight,
  name: string,
  scene: THREE.Scene
) => {
  const lightHelper = new THREE.DirectionalLightHelper(light, 5, light.color);
  scene.add(lightHelper);
  makeDirectionalLightGUI(
    gui,
    light,
    name,
    () => {
      light.target.updateMatrixWorld();
      lightHelper.update();
    },
    -800,
    800,
    1
  );
};
