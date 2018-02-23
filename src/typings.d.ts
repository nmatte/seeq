/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var webkitAudioContext: {
  new (): AudioContext;
}
