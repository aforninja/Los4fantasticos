function init(hero) {
    hero.setName("Omega Red/Arkady Rossovich");
    hero.setTier(4);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_omega_red");
    hero.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 5.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.05, 1);
    
	hero.addKeyBind("TENTACLE_JAB", "Tentacle Jab", 1);
	hero.addKeyBind("TENTACLE_STRIKE", "Tentacle Strike", 4);
	hero.addKeyBind("TENTACLE_GRAB", "Tentacle Grab", 2);
	hero.addKeyBindFunc("func_DRAIN", drain, "Drain Life Energy", 3);
	hero.addKeyBindFunc("func_HEAL", healFull, "Super Heal", 3);
	hero.addKeyBind("TENTACLES", "Tentacles", 5);
    
	hero.addKeyBind("AIM", "Aim", 3);

	hero.addDamageProfile("DRAIN", {
        "types": {
            "COSMIC": 1.0
        }
    });
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);
    
    hero.setTickHandler((entity, manager) => {
        var t = entity.as("TENTACLE");
        
		if (entity.getData("fiskheroes:tentacles") != 0 && t.getGrabTimer()) {
            manager.setData(entity, "tgheroes:dyn/playerIsInDome", true);  
		}
        if  (entity.getData("fiskheroes:tentacles") == 0 ) {
            manager.setData(entity, "tgheroes:dyn/playerIsInDome", false);  
        }
        
        
        //drain energy
        
        
        if (entity.getData('tgheroes:dyn/super_heal')) {
            manager.setData(entity, 'tgheroes:dyn/drain_charge', 0)
        }
        
        manager.incrementData(entity, 'tgheroes:dyn/heal_timer', 20, 20, entity.getData('tgheroes:dyn/super_heal'))
        
        if (entity.getData('tgheroes:dyn/heal_timer') == 1) {
            manager.setData(entity, 'tgheroes:dyn/super_heal', false)
        }

        if (entity.getData("fiskheroes:grab_id") == -1 || entity.getData('tgheroes:dyn/drain_charge') == 1) {
            manager.setData(entity, 'tgheroes:dyn/drain', false)
        }

        if (entity.getData('tgheroes:dyn/drain') && entity.getData('tgheroes:dyn/drain_charge') != 1) {
            manager.setData(entity, 'tgheroes:dyn/drain_charge', entity.getInterpolatedData('tgheroes:dyn/drain_charge') + 0.002)
        }

        manager.incrementData(entity, 'tgheroes:dyn/drain_timer', 20, 20, entity.getData('tgheroes:dyn/drain'))
        
        var world = entity.world()
        var grabbedEntity = world.getEntityById(entity.getData("fiskheroes:grab_id"))

        if (entity.getData('tgheroes:dyn/drain_timer') > 0 && entity.getData('tgheroes:dyn/drain')) {
            grabbedEntity.hurtByAttacker(hero, "DRAIN", "%s was drained to death", 0.5, entity);
        }
        
        return true;
	});
}

function healFull(entity, manager) {
    manager.setData(entity, 'tgheroes:dyn/super_heal', true)
    return true
}
function drain(entity, manager) {
    manager.setData(entity, 'tgheroes:dyn/drain', !entity.getData('tgheroes:dyn/drain'))
    return true
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "TENTACLE_JAB":
            return entity.getData("tgheroes:dyn/playerIsInDome");
    case "AIM":
            return entity.getData("tgheroes:dyn/playerIsInDome");        
	case "TENTACLE_STRIKE":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLE_GRAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLES":
        return !entity.getData("fiskheroes:shield");	
	case "func_DRAIN":
        return entity.getData("fiskheroes:grab_id") != -1 && entity.getData('tgheroes:dyn/drain_charge') != 1 && !entity.getData('tgheroes:dyn/super_heal');	
    case "func_HEAL":
        return entity.getData('tgheroes:dyn/drain_charge') >= 1;
    default:
        return true;
    }
}
function isModifierEnabled(entity, modifier) {
	switch (modifier.name()) {
	
	case "fiskheroes:healing_factor":
        return entity.getData('tgheroes:dyn/super_heal');
	default:
        return true;
    }
}
function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}