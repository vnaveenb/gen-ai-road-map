---
id: peft-and-rag-questions
title: PEFT and RAG Interview Questions
competency: C4
difficulty: advanced
status: draft
version: 2.0
created: 2026-04-05
updated: 2026-04-05
linked_explainers:
  - ../explainers/lora-and-qlora-practical-guide.md
  - ../explainers/rag-pipeline-and-retrieval-optimization.md
question_count: 28
tags:
  - peft
  - rag
  - retrieval
  - adaptation
---

# PEFT and RAG Interview Questions

## Scope
This file targets high-depth interviews on adaptation strategy, retrieval architecture, and production-safe optimization.

## How To Use This File
- Practice top questions with four layers:
  1. short answer
  2. deep answer
  3. follow-up ladder
  4. anti-pattern answer to avoid
- Use retrieval metrics and rollout controls in every systems answer.

## Interviewer Probe Map
- Can you separate knowledge problems from behavior problems?
- Can you debug RAG by stage instead of guessing at prompts?
- Can you justify cost, latency, and quality tradeoffs with metrics?

```mermaid
flowchart TD
    A[Need quality improvement] --> B{Knowledge missing or stale?}
    B -- Yes --> C[Use RAG baseline]
    B -- No --> D{Behavior/style mismatch?}
    D -- Yes --> E[Use prompt then PEFT if needed]
    D -- No --> F[Fix orchestration or data path]
    C --> G[Measure retrieval and faithfulness]
    E --> H[Measure behavior delta and drift risk]
    G --> I[Select least complex winning path]
    H --> I
```

Figure: Adaptation choice path for interviews and design rounds.

## Question Clusters
- Foundations: Q1 to Q10
- Systems and Rollout: Q11 to Q20
- Debugging and Incidents: Q21 to Q28

## Foundations

### Q1: Prompting vs RAG vs LoRA decision
What interviewer is probing:
- Strategy selection under changing constraints.

Direct answer:
Use prompting for lightweight behavior shaping, RAG for dynamic knowledge grounding, and LoRA/PEFT for durable behavior adaptation when prompt-only performance plateaus.

Deep answer:
1. Classify gap: missing facts, weak reasoning pattern, or style/control issue.
2. Start with the least invasive option that can be evaluated quickly.
3. If facts are stale or private, choose RAG first.
4. If behavior is consistently wrong despite strong context, evaluate PEFT.
5. Define rollback criteria before rollout.

Follow-up variants:
- How would you compare options with the same latency budget?
- When is PEFT a mistake for enterprise knowledge tasks?

Common mistakes and red flags:
"Fine-tune first because it is more powerful" without diagnosing problem type.

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q2: How do you choose LoRA rank?
What interviewer is probing:
- Practical PEFT tuning and overfitting awareness.

Direct answer:
Treat rank as a capacity knob: increase until marginal quality gain flattens relative to latency and memory cost.

Deep answer:
Run a small rank sweep (for example low, medium, high) on a fixed eval set. Track quality gain, variance across slices, and inference overhead. Prefer the smallest rank that meets target metrics and remains stable across domains.

Follow-up variants:
- What signs indicate rank is too low?
- How do you detect PEFT overfitting on narrow data?

Common mistakes and red flags:
Choosing rank by convention with no eval evidence.

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q3: Diagnose weak RAG faithfulness
What interviewer is probing:
- Retrieval-first debugging discipline.

Direct answer:
Separate retrieval quality from generation behavior before changing prompts or models.

Deep answer:
1. Measure retrieval recall@k and precision@k on failing queries.
2. Validate citation correctness and context ordering.
3. Inspect chunk boundaries and metadata filters.
4. Add or tune reranker only if first-pass retrieval is noisy.
5. Tighten grounded prompting and abstention policy.

Follow-up variants:
- If recall is high but faithfulness is low, where do you look next?
- What online metric catches this regression early?

Common mistakes and red flags:
Blindly increasing top-k and token budget.

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q4: When should you use hybrid retrieval?
What interviewer is probing:
- Dense and lexical tradeoff reasoning.

Direct answer:
Use hybrid when traffic includes IDs, product names, acronyms, or exact-match constraints that dense retrieval misses.

Deep answer:
Dense handles semantic recall, lexical preserves exact constraints. Enterprise corpora usually require both. Use rank fusion and evaluate by query slice. Hybrid should be justified by measurable gains on ID-heavy and troubleshooting queries.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q5: How do you build a RAG eval set?
What interviewer is probing:
- Evaluation design and regression safety.

Direct answer:
Create a slice-balanced set with gold evidence references and expected answer properties.

Deep answer:
Include high-frequency tasks, edge cases, and adversarial prompts. Label relevant chunks and define graders for retrieval and faithfulness. Keep the set versioned and tie each production change to eval deltas.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q6: Why can larger chunks hurt relevance?
What interviewer is probing:
- Chunking granularity intuition.

Direct answer:
Use a clear, constraint-first decision for why can larger chunks hurt relevance?, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q7: How do you reduce RAG latency without quality collapse?
What interviewer is probing:
- Optimization under SLO pressure.

Direct answer:
Use a clear, constraint-first decision for how do you reduce rag latency without quality collapse?, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q8: Context-window expansion vs better retrieval quality
What interviewer is probing:
- Cost-aware architecture judgment.

Direct answer:
Use a clear, constraint-first decision for context-window expansion vs better retrieval quality, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q9: Multi-tenant access control in RAG
What interviewer is probing:
- Security and isolation in retrieval systems.

Direct answer:
Use a clear, constraint-first decision for multi-tenant access control in rag, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q10: Metadata schema for traceable citations
What interviewer is probing:
- Data modeling for auditability.

## Systems and Rollout

Direct answer:
Use a clear, constraint-first decision for metadata schema for traceable citations, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q11: Embedding model migration plan with low risk
What interviewer is probing:
- Safe migration design.

Direct answer:
Use a clear, constraint-first decision for embedding model migration plan with low risk, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q12: ANN index parameter tuning strategy
What interviewer is probing:
- Recall-latency tuning under constraints.

Direct answer:
Use a clear, constraint-first decision for ann index parameter tuning strategy, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q13: Retrieval latency budget decomposition
What interviewer is probing:
- Component-level performance ownership.

Direct answer:
Use a clear, constraint-first decision for retrieval latency budget decomposition, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q14: Query rewriting policy and safety controls
What interviewer is probing:
- Correctness and observability of query transforms.

Direct answer:
Use a clear, constraint-first decision for query rewriting policy and safety controls, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q15: When PEFT beats prompt-only methods
What interviewer is probing:
- Long-term adaptation strategy.

Direct answer:
Use a clear, constraint-first decision for when peft beats prompt-only methods, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q16: QLoRA production caveats
What interviewer is probing:
- Quantization plus adaptation risk awareness.

Direct answer:
Use a clear, constraint-first decision for qlora production caveats, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q17: Offline improvements but online regressions
What interviewer is probing:
- Distribution-shift diagnosis.

Direct answer:
Use a clear, constraint-first decision for offline improvements but online regressions, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q18: Citation verification architecture
What interviewer is probing:
- Grounding enforcement beyond formatting checks.

Direct answer:
Use a clear, constraint-first decision for citation verification architecture, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q19: Cold-start strategy for new corpus
What interviewer is probing:
- Pragmatic bootstrapping decisions.

Direct answer:
Use a clear, constraint-first decision for cold-start strategy for new corpus, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q20: Multilingual retrieval architecture choices
What interviewer is probing:
- Cross-language search quality reasoning.

## Debugging and Incidents

Direct answer:
Use a clear, constraint-first decision for multilingual retrieval architecture choices, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q21: Faithfulness dropped but recall@k is stable
What interviewer is probing:
- Stage isolation discipline.

Direct answer:
Use a clear, constraint-first decision for faithfulness dropped but recall@k is stable, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q22: Recall dropped after ingestion pipeline change
What interviewer is probing:
- Data pipeline regression debugging.

Direct answer:
Use a clear, constraint-first decision for recall dropped after ingestion pipeline change, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q23: Increasing top-k made answers worse
What interviewer is probing:
- Context-noise tradeoff understanding.

Direct answer:
Use a clear, constraint-first decision for increasing top-k made answers worse, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q24: Reranker helps offline but hurts p95 online
What interviewer is probing:
- Production gating and selective routing.

Direct answer:
Use a clear, constraint-first decision for reranker helps offline but hurts p95 online, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q25: Model returns citations that look valid but are wrong
What interviewer is probing:
- Semantic citation verification design.

Direct answer:
Use a clear, constraint-first decision for model returns citations that look valid but are wrong, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q26: Tenant leakage incident in retrieval logs
What interviewer is probing:
- Incident handling and containment.

Direct answer:
Use a clear, constraint-first decision for tenant leakage incident in retrieval logs, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q27: Is regression from model swap or retriever drift?
What interviewer is probing:
- Layered attribution methodology.

Direct answer:
Use a clear, constraint-first decision for is regression from model swap or retriever drift?, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
### Q28: Rollback criteria for RAG deployment
What interviewer is probing:
- Operational discipline under pressure.

```mermaid
flowchart TD
    A[RAG Failure Reported] --> B{Recall@k dropped?}
    B -- Yes --> C[Inspect ingestion freshness chunking filters]
    B -- No --> D{Citation correctness dropped?}
    D -- Yes --> E[Audit context builder and citation validator]
    D -- No --> F{Latency spike?}
    F -- Yes --> G[Tune top-k rerank thresholds and index params]
    F -- No --> H[Inspect prompt template and model changes]
```

Figure: Fast triage path for retrieval and grounding incidents.

## Rapid-Fire Round
- Two signs reranking is worth its latency tax.
- Three causes of citation mismatch despite high recall.
- One case where PEFT clearly outperforms prompt-only adaptation.
- Two reasons query rewriting can reduce trust if unobserved.

## Company Emphasis
- Amazon:
  - explicit cost and operational ownership.
  - measurable rollback criteria.
- Google:
  - stronger retrieval metric fluency and ablation rigor.
  - deeper follow-ups on embedding/index tradeoffs.
- Startup:
  - fast iterative loops and pragmatic architecture decisions.
  - clear prioritization under small-team constraints.

## References
- [lora-and-qlora-practical-guide.md](../explainers/lora-and-qlora-practical-guide.md)
- [rag-pipeline-and-retrieval-optimization.md](../explainers/rag-pipeline-and-retrieval-optimization.md)
- RAG paper: https://arxiv.org/abs/2005.11401
- BEIR benchmark: https://arxiv.org/abs/2104.08663

Direct answer:
Use a clear, constraint-first decision for rollback criteria for rag deployment, then state one production tradeoff (latency, cost, or reliability).

Deep answer:
1. State assumptions, constraints, and success metric.
2. Explain the chosen design or algorithm and why alternatives are weaker.
3. Cover failure handling, observability, and rollback criteria.

Common mistakes and red flags:
- Naming tools or algorithms without mapping them to constraints.
- Ignoring edge cases, failure modes, or rollback triggers.
- Skipping metrics needed to prove the design works in production.

Follow-up variants:
- What changes if throughput doubles or latency budget is cut in half?
- Which single metric would trigger rollback after deployment?

Sample code or pseudocode (when relevant):
```text
# Interview outline
1) Validate inputs and constraints
2) Apply core strategy
3) Add failure handling and observability hooks
```
