import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
    Bear: new ImageSource('images/bear.png'),
    Cone: new ImageSource('images/cone.png'),
    Heart: new ImageSource('images/heart.png'),
    Rock: new ImageSource('images/rock.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }