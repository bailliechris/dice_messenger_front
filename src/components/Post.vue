<template>
    <div class="card">
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="title is-5">{{post.name}}</p>
                <p class="subtitle is-5"><time>{{time}}</time>||{{post.msg}}</p>                
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Post',

    props: {
        post: {type: Object, required: false, }
    },
    computed: {
        time: function() {
            let timeToShow = new Date(this.post.time);
            return timeToShow.toLocaleTimeString();
        }
    }

}
</script>