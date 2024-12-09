/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明 JSX 支持
declare namespace JSX {
  interface IntrinsicElements {
    [elem: string]: any;
  }
}