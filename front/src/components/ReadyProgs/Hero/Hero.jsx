import classes from "./Hero.module.scss"

export default function Hero() {
    return(
    <div className={classes.hero}>
      <div className={classes.article}>
        <h1 className={classes.mainTitle}>
        Выберите готовую программу питания
        </h1>
        <p className={classes.foodProgram}>
        Выберите программу питания, соответствующую вашей цели, и мы подберем подходящий рацион для вас. Благодаря конструктору питания Вы можете самостоятельно подобрать оптимальное сочетание блюд, учитывая их калорийность, белки, жиры и углеводы, что позволит Вам следить за своим здоровьем.
        </p>
        <div className={classes.foodConstructor}>
          <h1>
          Конструктор рационов
          </h1>
          <p>
          Изменяйте меню по своему усмотрению, убирая любые ингредиенты, выбирая длительность программы и отмечая желаемую дневную калорийность.
          </p>
        </div>
      </div>
    </div>
    )
}