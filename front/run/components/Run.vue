<template>
    <div id="run-container">
        <h1>Easy asm</h1>
        <div id="editor-container">
            <textarea id="editor"></textarea>
        </div>
    </div>
</template>
<style>

    #run-container {
        width: 80%;
        margin: 20px auto;
    }

    #editor-container {
        margin: 20px 0;
        border-style: solid;
        border-width: 1px;
        border-color: #ddd;
    }

    .CodeMirror {
        height: 500px !important;
    }

</style>
<script>

    export default{
        data(){
            return{
                code: ''
            }
        },
        ready(){
            var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
                lineNumbers: true
            });
            CodeMirror.on(editor, 'change', function () {
                this.code = editor.getValue();
            }.bind(this));
        }
    }

</script>
