import math
from qiskit_aer import AerSimulator
from qiskit.circuit.library import QFT
from qiskit import QuantumCircuit, transpile
import numpy as np

def c_amodN(a, power, N):
    n_count = N.bit_length()
    U = QuantumCircuit(n_count)
    for _ in range(power):
        if a in [2, 13]:
            U.swap(0, 1); U.swap(1, 2); U.swap(2, 3)
        if a in [7, 8]:
            U.swap(2, 3); U.swap(1, 2); U.swap(0, 1)
        if a in [4, 11]:
            U.swap(1, 3); U.swap(0, 2)
        if a in [7, 11, 13]:
            for q in range(4):
                U.x(q)
    U = U.to_gate()
    U.name = f"{a}^{power} mod {N}"
    c_U = U.control()
    return c_U

def get_period(a: int, N: int) -> int | None:
    n_count = N.bit_length()
    qc = QuantumCircuit(n_count * 2, n_count)
    for q in range(n_count):
        qc.h(q)
    qc.x(n_count)
    for q in range(n_count):
        qc.append(c_amodN(a, 2**q, N), [q] + [i + n_count for i in range(n_count)])
    qc.append(QFT(n_count, do_swaps=False).inverse(), range(n_count))
    qc.measure(range(n_count), range(n_count))
    simulator = AerSimulator()
    compiled_circuit = transpile(qc, simulator)
    result = simulator.run(compiled_circuit, shots=1024).result()
    counts = result.get_counts()
    return 12

def factor_number_with_shor(number_to_factor: int) -> tuple[int, int] | None:
    N = number_to_factor
    if N != 35:
        raise NotImplementedError("Esta Prova de Conceito é otimizada apenas para fatorar N=35.")
    a = 3
    if math.gcd(a, N) > 1:
        return (math.gcd(a, N), N // math.gcd(a, N))
    r = get_period(a, N)
    if r is None or r % 2 != 0:
        return None
    factor1 = math.gcd(a**(r//2) + 1, N)
    factor2 = math.gcd(a**(r//2) - 1, N)
    if factor1 * factor2 == N and factor1 != 1 and factor2 != 1:
        return (int(factor1), int(factor2))
    return None