function init(renderer, trailType, utils) {

   
    utils.bindBeam(renderer, "fiskheroes:charged_beam", null, "body", 0xF0F0F0, []);
    
    utils.bindBeam(renderer, "fiskheroes:heat_vision", null, "body", 0xF0F0F0, []);

    var anim = renderer.createResource("ANIMATION", "tgheroes:wall_run");
    anim.setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:flight_animation")));
    renderer.addCustomAnimation("WALL_RUN", anim);

}











