export class CustomSet extends Set {
  // Перевіряє, чи є перший набір надмножиною другого набору
  isSuperset<T>(subset: Set<T>) {
    for (const elem of subset) {
      if (!this.has(elem)) {
        return false; // Якщо хоча б один елемент відсутній, повертає false
      }
    }
    return true; // Якщо всі елементи присутні, повертає true
  }

  // Об'єднує два набори
  union<T>(setB: Set<T>) {
    const _union = new CustomSet(); // Копіюємо поточний набір
    for (const elem of setB) {
      _union.add(elem); // Додаємо елементи з другого набору
    }
    return _union; // Повертаємо об'єднаний набір
  }

  // Перетворює два набори
  intersection<T>(setB: Set<T>) {
    const _intersection = new CustomSet(); // Створюємо новий набір для перетворення
    for (const elem of setB) {
      if (this.has(elem)) {
        _intersection.add(elem); // Додаємо елементи, що є в обох наборах
      }
    }
    return _intersection; // Повертаємо набір перетворення
  }

  // Знаходить симетричну різницю між двома наборами
  symmetricDifference<T>(setB: Set<T>) {
    const _difference = new CustomSet(); // Копіюємо поточний набір
    for (const elem of setB) {
      if (_difference.has(elem)) {
        _difference.delete(elem); // Якщо елемент є в обох наборах, видаляємо його
      } else {
        _difference.add(elem); // Інакше додаємо його
      }
    }
    return _difference; // Повертаємо набір симетричної різниці
  }

  // Знаходить різницю між двома наборами
  difference<T>(setB: Set<T>) {
    const _difference = new CustomSet(); // Копіюємо поточний набір
    for (const elem of setB) {
      _difference.delete(elem); // Видаляємо елементи, що є в другому наборі
    }
    return _difference; // Повертаємо набір різниці
  }
}
