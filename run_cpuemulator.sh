CPUEMULATOR=/path/to/nand2tetris/tools/CPUEmulator.sh

testDir=test/data
declare -a tests=(
  BasicTest/BasicTest.tst
  PointerTest/PointerTest.tst
  SimpleAdd/SimpleAdd.tst
  StackTest/StackTest.tst
  StaticTest/StaticTest.tst
  BasicLoop/BasicLoop.tst
  FibonacciSeries/FibonacciSeries.tst
  SimpleFunction/SimpleFunction.tst
  FibonacciElement/FibonacciElement.tst
  StaticsTest/StaticsTest.tst
  NestedCall/NestedCall.tst
)

for t in ${tests[@]}; do
  $CPUEMULATOR $testDir/$t
done
