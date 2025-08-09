function init(hero) {
    hero.setName("Cyclops/Scott Summers");
    hero.setTier(3);
    
    hero.setHelmet("Visor");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_cyclops");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
    
	hero.addKeyBind("AIM", "Optic Blast", 4);
    hero.addKeyBind("CHARGED_BEAM", "Optic Beam", 1);
	
	hero.addSoundEvent("MASK_OPEN", "fiskheroes:cowl_mask_open");
    hero.addSoundEvent("MASK_CLOSE", "fiskheroes:cowl_mask_close");
	hero.supplyFunction("canAim", canAim);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setHasProperty(hasProperty);
	hero.setModifierEnabled(isModifierEnabled);
	
	hero.addDamageProfile("SELF_HARM", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
            "COOK_ENTITY": false
        }
    });
	
	hero.setTickHandler((entity, manager) => {
        if (entity.getData("fiskheroes:mask_open")) {
            manager.setData(entity, "fiskheroes:heat_vision", true);
        }
		else if (!entity.getData("fiskheroes:mask_open")) {
            manager.setData(entity, "fiskheroes:heat_vision", false);
        }
		
		manager.incrementData(entity, "tgheroes:dyn/harm_timer", 400, 1, entity.getData("fiskheroes:heat_vision_timer"));
		
		
		if (entity.getData("tgheroes:dyn/harm_timer") > 0.5) {
			entity.hurt(hero, "SELF_HARM", "%s died from the pain of continuous use of heat vision ", 2);
		}
		
		manager.incrementData(entity, "tgheroes:dyn/mask_open_timer", 10, 15, entity.getData("fiskheroes:mask_open"));
    });
}

function hasProperty(entity, property) {
    return property == "MASK_TOGGLE";
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
	case "AIM":
		return !entity.getData("fiskheroes:mask_open");
	case "CHARGED_BEAM":
		return !entity.getData("fiskheroes:mask_open");
    default:
        return true;
    }
}

function isModifierEnabled(entity, modifier) {

    switch (modifier.name()) {
    case "fiskheroes:heat_vision":
        return  modifier.id() == "5" && entity.getData("tgheroes:dyn/harm_timer") < 0.25 
		|| modifier.id() == "10" && entity.getData("tgheroes:dyn/harm_timer") > 0.25;
    default:
        return true;
    }
}