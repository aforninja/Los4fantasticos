function init(renderer, trailType) {


    if (typeof trailType !== "undefined") {
        bindTrail(renderer, trailType);
    }


}

function bindTrail(renderer, trailType) {
    var prop = renderer.bindProperty("fiskheroes:trail");
    prop.setTrail(renderer.createResource("TRAIL", trailType));
    prop.setCondition(entity => entity.getInterpolatedData("tgheroes:dyn/invis_timer") > 0.2 && entity.getData("tgheroes:dyn/invis") 
    || entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.2 && entity.getData("tgheroes:dyn/psy"));
    return prop;
}
