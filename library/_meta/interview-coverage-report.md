# Interview Coverage Report

Generated: 2026-04-08T17:20:01.422Z

## Global Coverage
- Total questions: 178
- Direct answer coverage: 38/178 (21.3%)
- Deep answer coverage: 38/178 (21.3%)
- Mistakes coverage: 21/178 (11.8%)
- Follow-up coverage: 21/178 (11.8%)
- Code/pseudocode coverage: 5/178 (2.8%)

## Per File
| File | Total | Direct | Deep | Mistakes | Follow-up | Code | Missing blocks |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| library/core/adaptation-retrieval/interviews/peft-and-rag-questions.md | 28 | 5 | 5 | 3 | 3 | 0 | 28 |
| library/core/agents-evals-guardrails/interviews/agents-evals-and-safety-questions.md | 30 | 5 | 5 | 2 | 2 | 0 | 30 |
| library/core/ml-foundations/interviews/ml-dl-fundamentals-questions.md | 28 | 3 | 3 | 2 | 2 | 0 | 28 |
| library/core/production-engineering/interviews/llm-production-and-system-design-questions.md | 32 | 5 | 5 | 1 | 1 | 0 | 32 |
| library/core/python-dsa/interviews/python-and-dsa-ai-systems-questions.md | 30 | 10 | 10 | 7 | 7 | 5 | 25 |
| library/core/transformers-llm/interviews/transformers-and-tokenization-questions.md | 30 | 10 | 10 | 6 | 6 | 0 | 30 |

## Missing Details

### library/core/adaptation-retrieval/interviews/peft-and-rag-questions.md
- Q1: Prompting vs RAG vs LoRA decision: missing Code
- Q2: How do you choose LoRA rank?: missing Code
- Q3: Diagnose weak RAG faithfulness: missing Code
- Q4: When should you use hybrid retrieval?: missing Mistakes, Follow-up, Code
- Q5: How do you build a RAG eval set?: missing Mistakes, Follow-up, Code
- Q6: Why can larger chunks hurt relevance?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q7: How do you reduce RAG latency without quality collapse?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q8: Context-window expansion vs better retrieval quality: missing Direct, Deep, Mistakes, Follow-up, Code
- Q9: Multi-tenant access control in RAG: missing Direct, Deep, Mistakes, Follow-up, Code
- Q10: Metadata schema for traceable citations: missing Direct, Deep, Mistakes, Follow-up, Code
- Q11: Embedding model migration plan with low risk: missing Direct, Deep, Mistakes, Follow-up, Code
- Q12: ANN index parameter tuning strategy: missing Direct, Deep, Mistakes, Follow-up, Code
- Q13: Retrieval latency budget decomposition: missing Direct, Deep, Mistakes, Follow-up, Code
- Q14: Query rewriting policy and safety controls: missing Direct, Deep, Mistakes, Follow-up, Code
- Q15: When PEFT beats prompt-only methods: missing Direct, Deep, Mistakes, Follow-up, Code
- Q16: QLoRA production caveats: missing Direct, Deep, Mistakes, Follow-up, Code
- Q17: Offline improvements but online regressions: missing Direct, Deep, Mistakes, Follow-up, Code
- Q18: Citation verification architecture: missing Direct, Deep, Mistakes, Follow-up, Code
- Q19: Cold-start strategy for new corpus: missing Direct, Deep, Mistakes, Follow-up, Code
- Q20: Multilingual retrieval architecture choices: missing Direct, Deep, Mistakes, Follow-up, Code
- Q21: Faithfulness dropped but recall@k is stable: missing Direct, Deep, Mistakes, Follow-up, Code
- Q22: Recall dropped after ingestion pipeline change: missing Direct, Deep, Mistakes, Follow-up, Code
- Q23: Increasing top-k made answers worse: missing Direct, Deep, Mistakes, Follow-up, Code
- Q24: Reranker helps offline but hurts p95 online: missing Direct, Deep, Mistakes, Follow-up, Code
- Q25: Model returns citations that look valid but are wrong: missing Direct, Deep, Mistakes, Follow-up, Code
- Q26: Tenant leakage incident in retrieval logs: missing Direct, Deep, Mistakes, Follow-up, Code
- Q27: Is regression from model swap or retriever drift?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q28: Rollback criteria for RAG deployment: missing Direct, Deep, Mistakes, Follow-up, Code

### library/core/agents-evals-guardrails/interviews/agents-evals-and-safety-questions.md
- Q1: Workflow versus agent for a given product: missing Code
- Q2: Preventing infinite tool loops: missing Code
- Q3: Eval design for multi-step agents: missing Mistakes, Follow-up, Code
- Q4: Prompt injection defense in tool-calling systems: missing Mistakes, Follow-up, Code
- Q5: CI gating for LLM and prompt changes: missing Mistakes, Follow-up, Code
- Q6: False positives in guardrails: missing Direct, Deep, Mistakes, Follow-up, Code
- Q7: Tool permission model for enterprise agents: missing Direct, Deep, Mistakes, Follow-up, Code
- Q8: Designing reliable fallback behaviors: missing Direct, Deep, Mistakes, Follow-up, Code
- Q9: Structured output reliability in agent chains: missing Direct, Deep, Mistakes, Follow-up, Code
- Q10: Human-in-the-loop trigger policies: missing Direct, Deep, Mistakes, Follow-up, Code
- Q11: Building a high-signal eval set with limited budget: missing Direct, Deep, Mistakes, Follow-up, Code
- Q12: Deterministic graders vs model-judge graders: missing Direct, Deep, Mistakes, Follow-up, Code
- Q13: Slice-based metrics for safety drift: missing Direct, Deep, Mistakes, Follow-up, Code
- Q14: Gate policy for high-risk product surfaces: missing Direct, Deep, Mistakes, Follow-up, Code
- Q15: Measuring refusal quality, not just refusal rate: missing Direct, Deep, Mistakes, Follow-up, Code
- Q16: Adversarial eval generation process: missing Direct, Deep, Mistakes, Follow-up, Code
- Q17: Canary strategy for agent upgrades: missing Direct, Deep, Mistakes, Follow-up, Code
- Q18: Audit trail requirements for regulated environments: missing Direct, Deep, Mistakes, Follow-up, Code
- Q19: Policy versioning and backward compatibility: missing Direct, Deep, Mistakes, Follow-up, Code
- Q20: Cost-aware evaluation cadence: missing Direct, Deep, Mistakes, Follow-up, Code
- Q21: Safety regression after prompt update: missing Direct, Deep, Mistakes, Follow-up, Code
- Q22: Agent success rate drops after tool API change: missing Direct, Deep, Mistakes, Follow-up, Code
- Q23: p95 latency spike with stable quality metrics: missing Direct, Deep, Mistakes, Follow-up, Code
- Q24: High refusal rate but no policy violation drop: missing Direct, Deep, Mistakes, Follow-up, Code
- Q25: Output schema failures in multi-step workflows: missing Direct, Deep, Mistakes, Follow-up, Code
- Q26: Incident where model leaked internal prompt hints: missing Direct, Deep, Mistakes, Follow-up, Code
- Q27: Agent appears to complete tasks but business KPI drops: missing Direct, Deep, Mistakes, Follow-up, Code
- Q28: Online quality drops but offline eval remains stable: missing Direct, Deep, Mistakes, Follow-up, Code
- Q29: Tool execution succeeds but answers remain incorrect: missing Direct, Deep, Mistakes, Follow-up, Code
- Q30: Post-incident hardening plan: missing Direct, Deep, Mistakes, Follow-up, Code

### library/core/ml-foundations/interviews/ml-dl-fundamentals-questions.md
- Q1: Why cosine similarity for embeddings?: missing Code
- Q2: Explain overfitting from learning curves: missing Code
- Q3: AdamW vs SGD in fine-tuning: missing Mistakes, Follow-up, Code
- Q4: Batch size effects on optimization: missing Direct, Deep, Mistakes, Follow-up, Code
- Q5: Precision, recall, and F1 under imbalanced labels: missing Direct, Deep, Mistakes, Follow-up, Code
- Q6: Why gradient clipping helps unstable training: missing Direct, Deep, Mistakes, Follow-up, Code
- Q7: Weight decay intuition in large models: missing Direct, Deep, Mistakes, Follow-up, Code
- Q8: Bias-variance tradeoff in modern deep learning: missing Direct, Deep, Mistakes, Follow-up, Code
- Q9: How sequence length affects transformer compute: missing Direct, Deep, Mistakes, Follow-up, Code
- Q10: Calibration vs raw accuracy: missing Direct, Deep, Mistakes, Follow-up, Code
- Q11: Learning-rate warmup and scheduler design: missing Direct, Deep, Mistakes, Follow-up, Code
- Q12: Early stopping criteria design: missing Direct, Deep, Mistakes, Follow-up, Code
- Q13: Gradient accumulation under memory constraints: missing Direct, Deep, Mistakes, Follow-up, Code
- Q14: Choosing loss functions for noisy labels: missing Direct, Deep, Mistakes, Follow-up, Code
- Q15: A/B testing model updates with small eval sets: missing Direct, Deep, Mistakes, Follow-up, Code
- Q16: Interpreting precision@k vs recall@k in retrieval: missing Direct, Deep, Mistakes, Follow-up, Code
- Q17: nDCG and MRR use cases: missing Direct, Deep, Mistakes, Follow-up, Code
- Q18: Why one global score can hide regressions: missing Direct, Deep, Mistakes, Follow-up, Code
- Q19: Selecting threshold for binary decisions: missing Direct, Deep, Mistakes, Follow-up, Code
- Q20: Detecting label leakage and train/val contamination: missing Direct, Deep, Mistakes, Follow-up, Code
- Q21: Validation metric drops after data refresh: missing Direct, Deep, Mistakes, Follow-up, Code
- Q22: Run-to-run variance is too high: missing Direct, Deep, Mistakes, Follow-up, Code
- Q23: Model improves offline but worsens online: missing Direct, Deep, Mistakes, Follow-up, Code
- Q24: Training diverges intermittently: missing Direct, Deep, Mistakes, Follow-up, Code
- Q25: Good loss curves but poor downstream product KPI: missing Direct, Deep, Mistakes, Follow-up, Code
- Q26: Metric improvements only in easy slices: missing Direct, Deep, Mistakes, Follow-up, Code
- Q27: Choosing rollback criteria after optimization changes: missing Direct, Deep, Mistakes, Follow-up, Code
- Q28: Postmortem plan after recurring optimization regressions: missing Direct, Deep, Mistakes, Follow-up, Code

### library/core/production-engineering/interviews/llm-production-and-system-design-questions.md
- Q1: Design LLM serving for high QPS under latency SLO: missing Code
- Q2: Throughput versus tail latency tuning: missing Mistakes, Follow-up, Code
- Q3: Quantization rollout strategy: missing Mistakes, Follow-up, Code
- Q4: Multi-region reliability design: missing Mistakes, Follow-up, Code
- Q5: Reduce serving cost by 30 percent without quality drop: missing Mistakes, Follow-up, Code
- Q6: Deployment gate design with GitHub Actions: missing Direct, Deep, Mistakes, Follow-up, Code
- Q7: Designing streaming UX under strict latency budgets: missing Direct, Deep, Mistakes, Follow-up, Code
- Q8: Admission control strategy during traffic spikes: missing Direct, Deep, Mistakes, Follow-up, Code
- Q9: Prefix caching opportunities and pitfalls: missing Direct, Deep, Mistakes, Follow-up, Code
- Q10: Model routing for multilingual and code-heavy workloads: missing Direct, Deep, Mistakes, Follow-up, Code
- Q11: Capacity planning for quarterly growth: missing Direct, Deep, Mistakes, Follow-up, Code
- Q12: Build vs buy for managed inference services: missing Direct, Deep, Mistakes, Follow-up, Code
- Q13: SLO and error-budget design for LLM APIs: missing Direct, Deep, Mistakes, Follow-up, Code
- Q14: Golden signals for LLM serving health: missing Direct, Deep, Mistakes, Follow-up, Code
- Q15: Rollback criteria after model swap: missing Direct, Deep, Mistakes, Follow-up, Code
- Q16: Config drift prevention across environments: missing Direct, Deep, Mistakes, Follow-up, Code
- Q17: Safe schema evolution for tool-call outputs: missing Direct, Deep, Mistakes, Follow-up, Code
- Q18: Securing multi-tenant inference endpoints: missing Direct, Deep, Mistakes, Follow-up, Code
- Q19: Cost anomaly detection playbook: missing Direct, Deep, Mistakes, Follow-up, Code
- Q20: Evaluating autoscaling policies on GPUs: missing Direct, Deep, Mistakes, Follow-up, Code
- Q21: Release checklist for high-risk model upgrades: missing Direct, Deep, Mistakes, Follow-up, Code
- Q22: Audit log requirements for enterprise customers: missing Direct, Deep, Mistakes, Follow-up, Code
- Q23: High p95 with healthy p50: missing Direct, Deep, Mistakes, Follow-up, Code
- Q24: Quality regression only on long prompts: missing Direct, Deep, Mistakes, Follow-up, Code
- Q25: Streaming stalls under high concurrency: missing Direct, Deep, Mistakes, Follow-up, Code
- Q26: OOM spikes after context-window increase: missing Direct, Deep, Mistakes, Follow-up, Code
- Q27: Error rate spike after enabling quantization: missing Direct, Deep, Mistakes, Follow-up, Code
- Q28: Throughput increased but business KPI decreased: missing Direct, Deep, Mistakes, Follow-up, Code
- Q29: Canary looked good, full rollout failed: missing Direct, Deep, Mistakes, Follow-up, Code
- Q30: Distinguishing model regression from retrieval regression: missing Direct, Deep, Mistakes, Follow-up, Code
- Q31: Incident command process for severe outage: missing Direct, Deep, Mistakes, Follow-up, Code
- Q32: Postmortem improvements after recurring latency incidents: missing Direct, Deep, Mistakes, Follow-up, Code

### library/core/python-dsa/interviews/python-and-dsa-ai-systems-questions.md
- Q1: Design a thread-safe LRU cache: missing Code
- Q2: Implement per-user plus global rate limiter: missing Code
- Q3: Build top-k trending intents from stream: missing Mistakes, Follow-up, Code
- Q4: Async fan-out with timeout budget: missing Mistakes, Follow-up, Code
- Q5: Detect cycles in tool execution DAG: missing Mistakes, Follow-up, Code
- Q11: Multi-tenant cache isolation strategy: missing Direct, Deep, Mistakes, Follow-up, Code
- Q12: Queue design with priority aging: missing Direct, Deep, Mistakes, Follow-up, Code
- Q13: Bounded in-flight request registry design: missing Direct, Deep, Mistakes, Follow-up, Code
- Q14: Distributed rate limiter with Redis: missing Direct, Deep, Mistakes, Follow-up, Code
- Q15: Backpressure design in async pipelines: missing Direct, Deep, Mistakes, Follow-up, Code
- Q16: Choosing data structures for p95 latency SLO: missing Direct, Deep, Mistakes, Follow-up, Code
- Q17: Safe schema evolution in Python services: missing Direct, Deep, Mistakes, Follow-up, Code
- Q18: Designing bounded retries to avoid retry storms: missing Direct, Deep, Mistakes, Follow-up, Code
- Q19: Memory leak investigation in long-lived workers: missing Direct, Deep, Mistakes, Follow-up, Code
- Q20: Caching prompt prefixes without stale output bugs: missing Direct, Deep, Mistakes, Follow-up, Code
- Q21: p95 latency spike but p50 stable: missing Direct, Deep, Mistakes, Follow-up, Code
- Q22: Error rate spike after parser update: missing Direct, Deep, Mistakes, Follow-up, Code
- Q23: Limiter rejects too much good traffic: missing Direct, Deep, Mistakes, Follow-up, Code
- Q24: Cache hit rate collapses after deploy: missing Direct, Deep, Mistakes, Follow-up, Code
- Q25: Async tasks keep running after client disconnect: missing Direct, Deep, Mistakes, Follow-up, Code
- Q26: Duplicate writes observed during retries: missing Direct, Deep, Mistakes, Follow-up, Code
- Q27: Scheduler starvation for low-priority queue: missing Direct, Deep, Mistakes, Follow-up, Code
- Q28: CPU usage spikes under moderate QPS: missing Direct, Deep, Mistakes, Follow-up, Code
- Q29: Partial failures hide behind success status: missing Direct, Deep, Mistakes, Follow-up, Code
- Q30: Post-incident hardening plan for Python backend: missing Direct, Deep, Mistakes, Follow-up, Code

### library/core/transformers-llm/interviews/transformers-and-tokenization-questions.md
- Q1: Walk through scaled dot-product attention: missing Code
- Q2: Why multi-head attention?: missing Code
- Q3: Decoder-only vs encoder-decoder choice: missing Code
- Q4: Tokenization mismatch bug diagnosis: missing Code
- Q5: Context window vs RAG decision: missing Code
- Q6: Token budget optimization strategy: missing Code
- Q7: Explain causal masking failure impact: missing Mistakes, Follow-up, Code
- Q8: Prefill vs decode bottleneck diagnosis: missing Mistakes, Follow-up, Code
- Q9: Explain KV cache in one production paragraph: missing Mistakes, Follow-up, Code
- Q10: Positional encoding choices: missing Mistakes, Follow-up, Code
- Q11: Why does latency grow faster than expected at long context?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q12: How do you benchmark transformer serving safely?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q13: Quantization rollout strategy for production: missing Direct, Deep, Mistakes, Follow-up, Code
- Q14: How do you detect context truncation regressions?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q15: Batch size tuning under strict p95 SLO: missing Direct, Deep, Mistakes, Follow-up, Code
- Q16: Long prompt injection defense in context-heavy systems: missing Direct, Deep, Mistakes, Follow-up, Code
- Q17: Which metrics trigger rollback after model swap?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q18: When should you use smaller specialist model routing?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q19: How do you isolate model regression from retrieval regression?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q20: How do you choose model families for multilingual and code-heavy traffic?: missing Direct, Deep, Mistakes, Follow-up, Code
- Q21: Repetition loops during generation: missing Direct, Deep, Mistakes, Follow-up, Code
- Q22: Sudden token cost spike week-over-week: missing Direct, Deep, Mistakes, Follow-up, Code
- Q23: High p95 with healthy p50: missing Direct, Deep, Mistakes, Follow-up, Code
- Q24: Model performs well offline but fails in production: missing Direct, Deep, Mistakes, Follow-up, Code
- Q25: Inconsistent outputs across seemingly same prompts: missing Direct, Deep, Mistakes, Follow-up, Code
- Q26: Tool-call JSON malformed intermittently: missing Direct, Deep, Mistakes, Follow-up, Code
- Q27: Attention head visualizations look noisy: missing Direct, Deep, Mistakes, Follow-up, Code
- Q28: RAG context improves recall but hurts answer quality: missing Direct, Deep, Mistakes, Follow-up, Code
- Q29: Tokenizer upgrade broke backward compatibility: missing Direct, Deep, Mistakes, Follow-up, Code
- Q30: Streaming output stalls under load: missing Direct, Deep, Mistakes, Follow-up, Code

