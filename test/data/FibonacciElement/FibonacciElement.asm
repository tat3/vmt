    @256
    D=A
    @SP
    M=D
    @Sys.init_RETURN_0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    D=M
    @LCL
    M=D
    @5
    D=D-A
    @ARG
    M=D
    @Sys.init
    0;JMP
(Sys.init_RETURN_0)
(Sys.init)
    @4
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @Main.fibonacci_RETURN_1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    D=M
    @LCL
    M=D
    @6
    D=D-A
    @ARG
    M=D
    @Main.fibonacci
    0;JMP
(Main.fibonacci_RETURN_1)
(FibonacciElement$WHILE)
    @FibonacciElement$WHILE
    0;JMP
(Main.fibonacci)
    @0
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    D=M-D
    @LT_0
    D;JLT
    @SP
    D=M
    A=D-1
    M=0
    @LT_END_0
    0;JMP
(LT_0)
    @SP
    D=M
    A=D-1
    M=-1
(LT_END_0)
    @SP
    M=M-1
    A=M
    D=M
    @FibonacciElement$IF_TRUE
    D;JNE
    @FibonacciElement$IF_FALSE
    0;JMP
(FibonacciElement$IF_TRUE)
    @0
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @LCL
    D=M
    @R13
    M=D
    @5
    D=A
    @R13
    A=M-D
    D=M
    @R14
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @ARG
    A=M
    M=D
    @ARG
    D=M+1
    @SP
    M=D
    @R13
    AM=M-1
    D=M
    @THAT
    M=D
    @R13
    AM=M-1
    D=M
    @THIS
    M=D
    @R13
    AM=M-1
    D=M
    @ARG
    M=D
    @R13
    AM=M-1
    D=M
    @LCL
    M=D
    @R14
    A=M
    0;JMP
(FibonacciElement$IF_FALSE)
    @0
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M-D
    @Main.fibonacci_RETURN_2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    D=M
    @LCL
    M=D
    @6
    D=D-A
    @ARG
    M=D
    @Main.fibonacci
    0;JMP
(Main.fibonacci_RETURN_2)
    @0
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M-D
    @Main.fibonacci_RETURN_3
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    D=M
    @LCL
    M=D
    @6
    D=D-A
    @ARG
    M=D
    @Main.fibonacci
    0;JMP
(Main.fibonacci_RETURN_3)
    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M+D
    @LCL
    D=M
    @R13
    M=D
    @5
    D=A
    @R13
    A=M-D
    D=M
    @R14
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @ARG
    A=M
    M=D
    @ARG
    D=M+1
    @SP
    M=D
    @R13
    AM=M-1
    D=M
    @THAT
    M=D
    @R13
    AM=M-1
    D=M
    @THIS
    M=D
    @R13
    AM=M-1
    D=M
    @ARG
    M=D
    @R13
    AM=M-1
    D=M
    @LCL
    M=D
    @R14
    A=M
    0;JMP