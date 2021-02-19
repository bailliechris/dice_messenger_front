<template>
    <div class="card">
    <div class="card-content">
        <div class="media">
        <div class="media-content">
            <p class="title is-6">{{post.name}}</p>
        </div>
        </div>

        <div class="subtitle is-6">
        {{post.msg}} 
        <br>
        <time>{{post.time}}</time>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Post',

    props: {
        post: {type: Object, required: false, }
    }

}
</script>