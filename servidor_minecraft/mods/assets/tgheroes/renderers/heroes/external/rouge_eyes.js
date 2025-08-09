function create(renderer, color, shape, beam, timer) {
    var eye = renderer.createEffect("fiskheroes:lines").setShape(shape).setRenderer(beam);
    eye.color.set(color);
    eye.anchor.set("head");

    return {
        render: (entity, isFirstPersonArm) => {
            var timer1 = entity.getInterpolatedData(timer);
            if (entity.getData("fiskheroes:blade")) {
                eye.opacity = timer1;
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
