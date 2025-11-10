---
date: 2025-04-15
tags:
  - "#engineering"
---
NER is an NLP technique where parts of unstructured data are classified into named entities (like place, time, people, organisation, date, event etc).

There are many methods to design NET algorithms,
1. Dictionary Based
2. Rule Based
3. Machine Learning Based
4. Deep Learning Based

**spaCy is an NLP library** that can be used to run NER over unstructured data sets. spaCy is a pre-trained model for recognising entities, however might need fine-tuning in case we are supposed to identify some new entities. Like for instance, the "Characteristic of a Place", place is already identified, however recognising the 'characteristic' may need additional training.

Following steps are to be taken while implementing NER,
1. Import Unstructured Data
2. Define Categories to distribute recognised entities

