function init(hero) {
    hero.setName("Sentinel");
    hero.setTier(6);
    
    hero.setHelmet("Head");
    hero.setChestplate("Torso");
    hero.setLeggings("Legs");
    hero.setBoots("Feet");
    
    hero.addPowers("tgheroes:xmen_sentinel");
    hero.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    
	hero.addKeyBind("TENTACLE_JAB", "Cables Jab", 4);
	hero.addKeyBind("TENTACLE_STRIKE", "Cables Strike", 1);
	hero.addKeyBind("TENTACLE_GRAB", "Cables Grab", 2);
	hero.addKeyBind("TENTACLES", "Cables", 5);
	
	hero.addKeyBind("GROUND_SMASH", "Ground Smash", 3);
	
	hero.addKeyBind("AIM", "Repulsor Blast", 4);
    hero.addKeyBind("CHARGED_BEAM", "Optic Beam", 1);
	
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.addSoundEvent("STEP", "fiskheroes:anti_walk");
	hero.setDefaultScale(6.0);
	hero.supplyFunction("canAim", canAim);
	hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, entity.getData("fiskheroes:flying"));
		   });
}
function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}


function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "TENTACLE_JAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLE_STRIKE":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLE_GRAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLES":
        return !entity.getData("fiskheroes:shield");
	case "AIM":
        return !entity.getData("fiskheroes:tentacles") == 1;
	case "CHARGED_BEAM":
        return !entity.getData("fiskheroes:tentacles") == 1;	
    default:
        return true;
    }
}