    @256
    D=A
    @SP
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
    @4
    M=D
    @0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @0
    D=A
    @THAT
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    A=M
    M=D
    @0
    D=A
    @THAT
    M=M-D
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @THAT
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    A=M
    M=D
    @1
    D=A
    @THAT
    M=M-D
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
    @0
    D=A
    @ARG
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @ARG
    A=M
    M=D
    @0
    D=A
    @ARG
    M=M-D
(MAIN_LOOP_START)
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
    @COMPUTE_ELEMENT
    D;JNE
    @END_PROGRAM
    0;JMP
(COMPUTE_ELEMENT)
    @0
    D=A
    @THAT
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @THAT
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
    A=A-1
    M=M+D
    @2
    D=A
    @THAT
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    A=M
    M=D
    @2
    D=A
    @THAT
    M=M-D
    @4
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
    M=M+D
    @SP
    M=M-1
    A=M
    D=M
    @4
    M=D
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
    @0
    D=A
    @ARG
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @ARG
    A=M
    M=D
    @0
    D=A
    @ARG
    M=M-D
    @MAIN_LOOP_START
    0;JMP
(END_PROGRAM)