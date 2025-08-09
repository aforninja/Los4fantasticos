
function init(hero) {
    hero.setName("Scarlet Witch/Wanda Maximoff");
    hero.setTier(1);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
	hero.addPrimaryEquipment("fisktag:weapon{WeaponType:tgheroes:darkhold}", true, item => item.nbt().getString("WeaponType") == 'tgheroes:darkhold');
	
	
    hero.addPowers("tgheroes:chaos_magic");
    hero.addAttribute("FALL_RESISTANCE", 2.0, 0);

	hero.addKeyBind("SHIELD", "Forcefield", 5);
	hero.addKeyBind("SPELL_MENU", "Witchcraft", 1);
	hero.addKeyBind("ENERGY_PROJECTION", "Eldritch Beam", -1);
	hero.addKeyBind("AIM", "Aim", 4);
	hero.addKeyBindFunc("func_CHOOSE", spellChoose, "Choose Spell", 4);
	hero.addKeyBind("TELEKINESIS", "Telekinesis", 5);
	
	hero.addKeyBind("CHAOS", "Chaos Magic", 2);
	
	
	hero.addKeyBind("TELEPORT", "Teleportation", 1);
	
	hero.addKeyBind("CHARGED_BEAM", "Chaos Beam", 5);
	
	hero.addKeyBind("SHADOWDOME", "Area Of Chaos", 3);
	
	hero.addKeyBindFunc("NO_MORE_MUTANTS", (player, manager) => {
        if (!player.getData("tgheroes:dyn/no_mutants") && player.getData("tgheroes:dyn/no_mutants_timer") == 0 && player.getData("tgheroes:dyn/playerIsInDome")) {
            manager.setData(player, "tgheroes:dyn/no_mutants", true);
			
        }
        return true;
    }, "No More Mutants", 5);
	
	hero.addDamageProfile("CHAOS", {
        "types": {
            "MAGIC": 1.0,
            "ETERNIUM": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "HEAT_TRANSFER": 30,
			"EFFECTS": [
                {
                  "id": "fiskheroes:eternium",
                  "duration": 200,
                  "amplifier": 0,
                  "chance": 1
                },
                {
                  "id": "fiskheroes:tutridium",
                  "duration": 200,
                  "amplifier": 0,
                  "chance": 1.0
                },
				{
                  "id": "fiskheroes:disable_phasing",
                  "duration": 200,
                  "amplifier": 0,
                  "chance": 1.0
                }
              ]
        }
    });
   
	hero.supplyFunction("canAim", canAim);
	hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.addAttributeProfile("THROW", throwProfile);
	hero.setAttributeProfile(getProfile);
	
    hero.setTickHandler((entity, manager) => {
		if (!entity.isSneaking() && !entity.isOnGround() && entity.motionY() < -0.8) {
				manager.setData(entity, "fiskheroes:flying", true);
			}
		//dart
		var choose = entity.getData("tgheroes:dyn/spell_choose");
			
		manager.incrementData(entity, "tgheroes:dyn/stand", 1, 1, entity.is("DISPLAY") && !entity.as("DISPLAY").isStatic());
			
			
		manager.incrementData(entity, "tgheroes:dyn/spell_basic", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 1);
		manager.incrementData(entity, "tgheroes:dyn/spell_heal", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 2);
		manager.incrementData(entity, "tgheroes:dyn/spell_bind", 1, 1, entity.getData("tgheroes:dyn/spell_choose") == 3);
		
		
			manager.incrementData(entity, "tgheroes:dyn/no_mutants_timer", 220, 2400, entity.getData("tgheroes:dyn/no_mutants"));
		
		
		if (entity.getData("tgheroes:dyn/no_mutants_timer") > 0.8 && entity.getData("tgheroes:dyn/no_mutants")) {
				var id = entity.getData("fiskheroes:lightsout_id");
			var dome = entity.world().getEntityById(id);
			var list = dome.as("SHADOWDOME").getContainedEntities();
				list.forEach(other => {
					if (!entity.equals(other)) {
						other.hurtByAttacker(hero, "CHAOS", "%s Erased by the wrath of the Scarlet Witch", 50.0, entity);

					}
				});
				if (entity.getData("tgheroes:dyn/no_mutants_timer") == 1 || !entity.getData("tgheroes:dyn/playerIsInDome")) {
					manager.setData(entity, "tgheroes:dyn/no_mutants", false);
				}

			}
			/*
			//SOUND_START	    
        
		
		if (entity.getData("tgheroes:dyn/no_mutants_timer") > 0.2) {
        manager.setData(entity, "tgheroes:dyn/no_mutants_timer_sound", 0);
        }
		
        if (entity.getData("tgheroes:dyn/no_mutants_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/no_mutants_timer_sound") == 0 )  {
			entity.playSound("tgheroes:no_more_mutants", 1, 1.25 - Math.random() * 0.4);
		}
		
	//SOUND_FINISH
		*/	
			var id = entity.getData("fiskheroes:lightsout_id");
			var dome = entity.world().getEntityById(id);
			var list = dome.as("SHADOWDOME").getContainedEntities();
			var caster = dome.as("SHADOWDOME").getCaster();

			for (var i = 0; i < list.size(); i++) {
				var le = list.get(i);
				if (le.getUUID() == caster.getUUID() && dome.exists()) {
					manager.setData(entity, "tgheroes:dyn/playerIsInDome", true);  
					break;
				} else {
					manager.setData(entity, "tgheroes:dyn/playerIsInDome", false);
				}
			}

			if (dome.exists() == false) {
				manager.setData(entity, "tgheroes:dyn/playerIsInDome", false);  
			}
		
		
		if (choose != 1 && choose != 2 && choose != 3) {
			manager.setData(entity, "tgheroes:dyn/spell_choose", 1);
			
		}
		
		if (entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty()) {
			manager.setData(entity, "tgheroes:dyn/chaos", false);
			
		}
		return true;
	});
}

function getProfile(entity) {
	if (entity.getData("tgheroes:dyn/no_mutants")) {
        return "THROW";
    }
	return false;
}

function throwProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -2.0, 0);
	profile.addAttribute("JUMP_HEIGHT", -2.0, 0);
	profile.addAttribute("PUNCH_DAMAGE", -2.0, 0);
}
function spellChoose(entity, manager) {
var choose = entity.getData("tgheroes:dyn/spell_choose");

if (choose >= 1 && choose < 6) {
    manager.setData(entity, "tgheroes:dyn/spell_choose", choose + 1);
}
if (choose == 6) {
    manager.setData(entity, "tgheroes:dyn/spell_choose", 1);
}
    return true;
}

function isModifierEnabled(entity, modifier) {

    var choose = entity.getData("tgheroes:dyn/spell_choose");

    switch (modifier.name()) {
    case "fiskheroes:repulsor_blast":
        return modifier.id() == "basic" && choose == 1 && !entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:telekinesis")  && !entity.getData("fiskheroes:energy_projection")
		|| modifier.id() == "heal" && choose  == 2 && !entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:telekinesis")  && !entity.getData("fiskheroes:energy_projection")
		|| modifier.id() == "binding" && choose == 3 && !entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:telekinesis")  && !entity.getData("fiskheroes:energy_projection")
		|| modifier.id() == "basic2" && choose == 1 && entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:telekinesis")  && !entity.getData("fiskheroes:energy_projection")
		|| modifier.id() == "heal2" && choose  == 2 && entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:telekinesis")  && !entity.getData("fiskheroes:energy_projection")
		|| modifier.id() == "binding2" && choose == 3 && entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:telekinesis")  && !entity.getData("fiskheroes:energy_projection");
	case "fiskheroes:energy_projection":
        return !entity.getData("fiskheroes:telekinesis");	
    default:
        return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "func_CHOOSE":
            return entity.isSneaking();
		case "TELEKINESIS":
            return !entity.getData("tgheroes:dyn/chaos") && entity.getData("fiskheroes:aiming") || entity.getData("fiskheroes:beam_shooting_timer") > 0 && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");	
		case "SHIELD":
            return !entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:flying") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "AIM":
            return !entity.isSneaking() && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "ENERGY_PROJECTION":
            return !entity.getData("tgheroes:dyn/chaos_timer") ==1 && entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:telekinesis") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "CHAOS":
            return !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "TELEPORT":
            return entity.getData("tgheroes:dyn/chaos_timer") ==1 && entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "CHARGED_BEAM":
            return entity.getData("fiskheroes:aiming") && entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "SPELL_MENU":
            return !entity.getData("fiskheroes:aiming") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "SHADOWDOME":
            return entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
		case "NO_MORE_MUTANTS":
            return entity.getData("tgheroes:dyn/chaos_timer") ==1 && !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && !entity.getData("fiskheroes:aiming") && entity.getData("tgheroes:dyn/playerIsInDome") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants");
	default:
		return true;
	}
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}
