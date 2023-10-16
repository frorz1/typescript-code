abstract class Vechile {
  public brand: string
  public vechileNo: string
  public days: number
  public total: number
  public deposit: number // 押金
  constructor (_brand: string, _vechileNo: string, _days: number, _total: number, _deposit: number) {
    this.brand = _brand
    this.vechileNo = _vechileNo
    this.days = _days
    this.total = _total
    this.deposit = _deposit
  }

  protected calculateRent () {
    console.log(this.brand + ' 车牌号为：' + this.vechileNo + '开始租赁')
    return 0
  }

  public payDeposit () {
    console.log(this.brand + ' 车牌号为：' + this.vechileNo + '租赁天数：' + this.days + '支付了：' + this.deposit)
  }

  public safeShow () {
    console.log('车规则...')
    console.log(this.brand + ' 车牌号为：' + this.vechileNo + '违规了')
  }
}

class Car extends Vechile {
  public type: string
  constructor (_brand: string, _vechileNo: string, _days: number, _total: number, _deposit: number, _type: string) {
    // super编译之后等于 Vechile.call(this, _brand, _vechileNo, _days, _total, _deposit)
    super(_brand, _vechileNo, _days, _total, _deposit) // super === Verchile
    this.type = _type
  }
  public getPriceByType () {
    let rentMony = 0
    if (this.type === 's600') {
      rentMony = 300
    } else if (this.type === 'c200') {
      rentMony = 200
    } else if (this.type === 'maibahe') {
      rentMony = 250
    }
    return rentMony
  }
  // 方法重写的好处是可以让子类共用父类中方法已经实现的部分功能
  // 重新规则: 修饰符的范围只能扩大，不能缩小，且父类方法不能是private
  public calculateRent(): number {
    // 使用父类方法
    super.calculateRent() // super === Vechile.prototype, 本句话也就等于Vechile.prototype.call(this)
    this.safeShow() // 子类没有这个方法，所以会通过寄生组合式继承的方式找到父类的原型上
    console.log('Car: ')
    console.log('brand: ', this.brand)
    return this.days * this.getPriceByType()
  }
}

const car = new Car('benz', '京A12345', 3, 20, 10, 's600')
console.log('car: ', car.calculateRent())


class Bus extends Vechile {
  public seatNum: number
  constructor (_brand: string, _vechileNo: string, _days: number, _total: number, _deposit: number, _seatNum: number) {
    // super编译之后等于 Vechile.call(this, _brand, _vechileNo, _days, _total, _deposit)
    super(_brand, _vechileNo, _days, _total, _deposit)
    this.seatNum = _seatNum
    if (this.seatNum > 200) {
      throw new Error('座位数不能超过200')
    }
  }
  public getPriceBySeatNum () {
    let rentMony = 0
    if (this.seatNum === 8) {
      rentMony = 100
    } else if (this.seatNum === 16) {
      rentMony = 200
    } else if (this.seatNum === 20) {
      rentMony = 250
    }
    return rentMony
  }
  public calculateRent(): number {
    super.calculateRent()
    console.log('Car: ')
    console.log('brand: ', this.brand)
    return this.days * this.getPriceBySeatNum()
  }
}

// Super详解

/**
 * 1、
 * 2、
 */

 export {}