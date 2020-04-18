# VM Translator

「コンピュータシステムの理論と実装」第7章より、VMコンパイラのTypeScript実装。

## Usage

### 1つのvmファイルだけで構成されている場合

```
$ yarn
$ yarn build
$ ./vmt test/data/StackTest/StackTest.vm
```

### 複数のvmファイルで構成されている場合

```
$ yarn
$ yarn build
$ ./vmtdir test/data/StaticsTest
```

## Run test

```
$ yarn
$ yarn run test
```
