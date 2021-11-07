<template>
    <section id="barOuter">
        <object id="svg" :data="objectSVG" type="image/svg+xml"></object>

        <section>
            <h5>MENU</h5>

            <div id="barContainer">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </section>
    </section>
</template>

<script>
import SVG from "../../assets/egg_logo_1.svg"
export default {
    name: "NavigationBar",
    components: {
        
    },
    data() {
        return {
            objectSVG: SVG
        }
    }
}
</script>

<style scoped>
#barOuter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
}
#svg {
    width: 20px;
    height: auto;
}
.bar {
    width: 20px;
    height: 4px;
    margin: 2px 0;
}
</style>