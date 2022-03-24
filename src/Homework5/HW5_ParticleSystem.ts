import Particle from "../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../Wolfie2D/Utils/RandUtils";
import { HW5_Color } from "./hw5_color";

/**
 * This particle system extends the base ParticleSystem class, and I reccommend you look at some of the implementation, 
 * at least for the default setParticleAnimation()
 * 
 * You'll just be handling the tweens for each particle for their animation, overriding the base implementation.
 * 
 * The new particle animation add these behaviors, along with the existing setParticleAnimation behaviors:
 * 
 *  - Each particle should look like they're affected by gravity, accelerating down over the course of their lifetime. This
 *  change should also be affected by the particle's mass, meaning particles with a higher mass should fall faster.
 * 
 *  - Each particle should disappear over it's lifetime, moving from an alpha of 1 to 0.
 */
export default class HW5_ParticleSystem extends ParticleSystem {
    setParticleAnimation(particle: Particle) {
        super.setParticleAnimation(particle);
        particle.velY = particle.mass * 10
        particle.vel = RandUtils.randVec(-30, 20, 10, 50)
        switch(particle.mass) { // Define particle color based on mass
            case 1: particle.color = Color.RED; break;
            case 2: particle.color = Color.GREEN; break;
            case 3: particle.color = Color.BLUE; break;
        }
        particle.tweens.add('active',
        {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: 'alpha',
                    start: 1.0,
                    end: 0.0,
                    ease: EaseFunctionType.IN_OUT_SINE // How a value should change over time
                },
                {
                    property: 'velY',
                    start: particle.velY,
                    end: particle.velY * (particle.mass * 500),
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ]
        })
    }
}