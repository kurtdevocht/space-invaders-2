input.onButtonPressed(Button.A, function () {
    SHIP.move(-1)
})
function checkHit () {
    if (ENEMY.isTouching(SHIP)) {
        DEAD = 1
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Baddy), music.PlaybackMode.InBackground)
        game.gameOver()
    }
    if (ENEMY.isTouching(SHOOT)) {
        game.addScore(1)
        music.play(music.createSoundExpression(
        WaveShape.Noise,
        2757,
        342,
        255,
        0,
        300,
        SoundExpressionEffect.Vibrato,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
        SHOOT.delete()
        ENEMY.delete()
    }
}
function spawnLaser () {
    if (SHOOT.isDeleted()) {
        SHOOT = game.createSprite(SHIP.get(LedSpriteProperty.X), SHIP.get(LedSpriteProperty.Y))
        SHOOTTIME = input.runningTime()
        SHOOT.change(LedSpriteProperty.Brightness, 80)
        music.play(music.createSoundExpression(WaveShape.Square, 5000, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
}
input.onButtonPressed(Button.AB, function () {
    spawnLaser()
})
input.onButtonPressed(Button.B, function () {
    SHIP.move(1)
})
function spawnEnemy () {
    ENEMY = game.createSprite(randint(0, 4), 0)
    ENEMYTIME = input.runningTime()
    ENEMY.set(LedSpriteProperty.Brightness, 150)
}
let ENEMYTIME = 0
let SHOOTTIME = 0
let ENEMY: game.LedSprite = null
let DEAD = 0
let SHOOT: game.LedSprite = null
let SHIP: game.LedSprite = null
SHIP = game.createSprite(2, 4)
SHOOT = game.createSprite(SHIP.get(LedSpriteProperty.X), SHIP.get(LedSpriteProperty.Y))
DEAD = 0
SHOOT.delete()
game.setScore(0)
spawnEnemy()
basic.forever(function () {
    if (DEAD == 0) {
        if (ENEMY.isDeleted()) {
            spawnEnemy()
        }
        ENEMY.set(LedSpriteProperty.Y, Math.round((input.runningTime() - ENEMYTIME) * 0.003))
        checkHit()
        if (!(SHOOT.isDeleted())) {
            SHOOT.set(LedSpriteProperty.Y, Math.round(4 - (input.runningTime() - SHOOTTIME) * 0.015))
            checkHit()
            if (input.runningTime() - SHOOTTIME > 300) {
                SHOOT.delete()
            }
        }
        if (input.runningTime() - ENEMYTIME > 1800) {
            ENEMY.delete()
        }
    }
})
