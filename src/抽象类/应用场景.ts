// 接口中的方法和抽象类中的抽象方法一样，都没有具体实现，所以需要子类全部实现
interface MouseListenerProcess {
  mouseReleased(e: any): void
  mousePressed(e: any): void
  mouseEntered(e: any): void
  mouseClicked(e: any): void
  mouseExited(e: any): void
}

// 如果直接显示接口，则需要每个方法都实现一遍，有的时候只有一两个高频方法会使用，所以就显得有点臃肿
class MyMouse implements MouseListenerProcess {
  mouseReleased(e: any): void {
    throw new Error("Method not implemented.")
  }
  mousePressed(e: any): void {
    throw new Error("Method not implemented.")
  }
  mouseEntered(e: any): void {
    throw new Error("Method not implemented.")
  }
  mouseClicked(e: any): void {
    throw new Error("Method not implemented.")
  }
  mouseExited(e: any): void {
    throw new Error("Method not implemented.")
  }

}

// 解决方案
// 使用抽象类实现接口，将高频使用的方法写成抽象方法，这样子类继承时，只需要必须实现相应的抽象方法即可
// 这个功能又叫做适配器adapter
abstract class MouseListenerAdapter implements MouseListenerProcess {
  mouseReleased(e: any): void {
    throw new Error("Method not implemented.")
  }
  mousePressed(e: any): void {
    throw new Error("Method not implemented.")
  }
  mouseEntered(e: any): void {
    throw new Error("Method not implemented.")
  }
  // 高频使用方法声明为抽象方法
  abstract mouseClicked(e: any): void 
  abstract mouseExited(e: any): void 
}

class MyMouseListener extends MouseListenerAdapter {
  mouseClicked(e: any): void {
    throw new Error("Method not implemented.")
  }
  mouseExited(e: any): void {
    throw new Error("Method not implemented.")
  }
}


export {}

