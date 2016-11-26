<template>
    <div id="run-container">
        <h1>Easy asm</h1>
        <div id="editor-container">
            <textarea id="editor"></textarea>
            <button style="float: right;" @click="run" class="pure-button">运行</button>
        </div>
        <h3>输出：</h3>
        <div id="run-output">
            <pre>{{ output }}</pre>
        </div>
    </div>
</template>
<style>

    @media screen and (min-width: 600px) {
        #run-container {
            width: 80%;
            margin: 20px auto;
        }

        #editor-container {
            margin: 20px 0;
        }
    }

    @media screen and (max-width: 600px) {
        #run-container {
            width: 95%;
            margin: auto;
        }

        #run-container > h1 {
            margin: 5px;
        }

        #editor-container {
            margin: 10px 0;
        }
    }

    #editor-container {
        border-style: solid;
        border-width: 1px;
        border-color: #ddd;
    }

    .CodeMirror {
        height: 500px !important;
    }

    #run-output {
        padding: 10px 5px;
        margin-top: 15px;
        border-style: solid;
        border-width: 1px;
        border-color: #ddd;
    }

    #run-output > pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        line-height: 20px;
        font-size: 15px;
        tab-size: 4;
    }

</style>
<script>

    export default {
        data() {
            return {
                code: '',
                output: ''
            }
        },
        ready() {
            var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
                lineNumbers: true
            });
            CodeMirror.on(editor, 'change', function () {
                this.code = editor.getValue();
            }.bind(this));
            editor.setValue('global main\n\nmain:\n\tmov eax, 0\n\tret\n');
        },
        methods: {
            run: function () {
                this.$http.post('/api/codes/run', {
                    code: this.code
                }).then(function (resp) {
                    var data = resp.data;
                    if (data.error) {
                        this.output = data.stderr;
                    } else {
                        this.output = data.stdout;
                    }
                    this.output += "process returns " + data.code;
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }

</script>
