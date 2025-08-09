function create(renderer, icon, backBoosters) {
    if (typeof icon === "string") {
        icon = renderer.createResource("ICON", icon);
    }
    
    var back;

    if (backBoosters) {
        back = renderer.createEffect("fiskheroes:booster").setIcon(icon);
        back.setOffset(0.0, 14.0, 0.0).setSize(12.0, 1.0);
        back.anchor.set("head");
        back.mirror = false;
    }

    return {
        back: back,
        render: (entity, renderLayer, isFirstPersonArm, all) => {
            if (!isFirstPersonArm) {
                if (all || renderLayer == "CHESTPLATE") {
                    var boost = entity.getInterpolatedData("fiskheroes:flight_timer");

                    if (back != null && entity.getData('fiskheroes:suit_open_timer') == 0) {
                        back.progress = entity.getInterpolatedData("fiskheroes:flight_timer");
                        back.speedScale = 0.1 * boost;
                        back.setRotation(0 - 0 * boost, 0.0, 0 - 0 * boost);
                        back.render();
                    }
                }
            }
        }
    };
}
