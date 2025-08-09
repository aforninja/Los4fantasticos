function init(renderer, trailType) {


    if (typeof trailType !== "undefined") {
        bindTrail(renderer, trailType);
    }


}

function bindTrail(renderer, trailType) {
    var prop = renderer.bindProperty("fiskheroes:trail");
    prop.setTrail(renderer.createResource("TRAIL", trailType));
    prop.setCondition(entity => entity.getData("fiskheroes:scale") < 1  && entity.getData("fiskheroes:scale") > 0.07);
    return prop;
}
