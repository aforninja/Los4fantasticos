function init(hero) {
    hero.setName("Juggernaut/Cain Marko");
    hero.setTier(9);
    
    hero.setHelmet("Helmet");
    
    hero.addPowers("tgheroes:juggernaut");
    hero.addAttribute("PUNCH_DAMAGE", 9.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
	hero.addAttribute("SPRINT_SPEED", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
	
    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 1);
	
	hero.setDefaultScale(1.5); 
	
    hero.setKeyBindEnabled(isKeyBindEnabled);
	
	hero.addDamageProfile("RAM", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
             "ADD_KNOCKBACK": 2.0
        }
    });
	
	hero.setTickHandler((entity, manager) => {
	  
	  
	  if (entity.isSprinting() && entity.isOnGround()) {
            var list2 = entity.world().getEntitiesInRangeOf(entity.eyePos(), 3.0);
            list2.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "RAM", "%s crushed by Juggernaut", 10.0, entity);

                }
            });
        }
		
		
		if (entity.isSprinting() && entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:shield", true);
            manager.setData(entity, "fiskheroes:shield_blocking", true);
        }
        if (!entity.isSprinting() && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:shield", false);
            manager.setData(entity, "fiskheroes:shield_blocking", false);
        }
   
   });
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
    case "GROUND_SMASH":
        return !entity.isSprinting();
    default:
        return true;
    }
}

