export class Cola<T> {
  #items: Record<number, T> = {};
  #frente = 0;
  #final = 0;

  encolar(elemento: T): void {
    this.#items[this.#final] = elemento;
    this.#final++;
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frente];
    delete this.#items[this.#frente];
    this.#frente++;
    return elemento;
  }

  frente(): T | undefined {
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente === this.#final;
  }

  get tamanio(): number {
    return this.#final - this.#frente;
  }

  aArray(): T[] {
    const arr: T[] = [];
    for (let i = this.#frente; i < this.#final; i++) {
      arr.push(this.#items[i]);
    }
    return arr;
  }
}
