<template>
    <div class="card">
    <div class="card-content">
        <br class="title is-6">{{post.name}} || {{post.msg}}
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