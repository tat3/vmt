    @256
    D=A
    @SP
    M=D
(Class1.set)
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
    @SP
    M=M-1
    A=M
    D=M
    @Class1.0
    M=D
    @1
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @Class1.1
    M=D
    @0
    D=A
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
(Class1.get)
    @Class1.0
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @Class1.1
    D=M
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