function create(renderer, color, shape, beam, timer, timerT, timerTr, timerF) {
    var eye = renderer.createEffect("fiskheroes:lines").setShape(shape).setRenderer(beam);
    eye.color.set(color);
    eye.anchor.set("head");

    return {
        render: (entity, isFirstPersonArm) => {
            var timer1 = entity.getInterpolatedData(timer);
            var timer2 = entity.getInterpolatedData(timerT);
            var timer3 = entity.getInterpolatedData(timerTr);
            var timer4 = entity.getData(timerF);
            if (entity.getData("fiskheroes:blade")) {
                eye.opacity = timer1;
            } 
            if (entity.getData("fiskheroes:beam_shooting")) {
                eye.opacity = timer2;
            } 
            if (timer3) {
                eye.opacity = timer3;
            } 
            if (timer4) {
                eye.opacity = 1;
            } else if (!timer4 && !timer3 && !entity.getData("fiskheroes:beam_shooting") && !entity.getData("fiskheroes:blade")) {
                eye.opacity = 0;
            }



            if (!isFirstPersonArm) {
                eye.setOffset(0, 0, 0);
                eye.setScale(1).setRotation(90, 0, 0);
                eye.anchor.ignoreAnchor(false);
            }

            eye.render();
        }
    };
}
