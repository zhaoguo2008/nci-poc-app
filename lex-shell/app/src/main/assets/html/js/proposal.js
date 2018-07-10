var Proposal = {
  query(onSucc) {
    Proposal.host.req('/proposal/list.json', null, r => {
      onSucc(r)
    })
  },
  queryProduct(tag, vendor,channelId,orgCode, text, onSucc) {
    Proposal.host.req('/proposal/query_clause.json', { tag: tag, company: vendor,channelId:channelId,orgCode:orgCode, text: text == "" ? null : text }, r => {
      onSucc(r)
    })
  },
  create(applicant, insurants, onSucc) {
    Proposal.host.req('/proposal/create.json', { applicant: applicant, insurants: insurants }, r => {
      onSucc(r)
    })
  },
  createPlan(proposalId, insurant, onSucc) {
    Proposal.host.req('/proposal/create_plan.json', { proposalId: proposalId, insurant: insurant }, r => {
      onSucc(r)
    })
  },
  load(proposalId, onSucc) {
    Proposal.host.req('/proposal/load.json', { proposalId: proposalId }, r => {
      onSucc(r)
    })
  },
  save(proposalId, onSucc) {
    Proposal.host.req('/proposal/save.json', { proposalId: proposalId }, r => {
      onSucc(r)

    })
  },
  view(proposalId, onSucc) {
    Proposal.host.req('/proposal/view.json', { proposalId: proposalId }, r => {
      onSucc(r)
    })
  },
  supply(proposalId, info, onSucc) {
    info.proposalId = proposalId
    Proposal.host.req('/proposal/supply.json', info, r => {
      onSucc(r)
    })
  },
  viewPlan(planId, onSucc) {
    Proposal.host.req('/proposal/plan/edit.json', { planId: planId }, r => {
      onSucc(r)
    })
  },
  refreshInsurant(planId, ins, onSucc) {
    Proposal.host.req('/proposal/plan/customer.json', { planId: planId, insurant: ins }, r => {
      onSucc(r)
    })
  },
  refreshCust(proposalId, applicant, insurants, onSucc) {
    Proposal.host.req('/proposal/customer.json', { proposalId: proposalId, applicant: applicant, insurants: insurants }, r => {
      onSucc(r)
    })
  },
  addProduct(planId, parent, prdId, onSucc) {
    Proposal.host.req('/proposal/plan/clause.json', { planId: planId, parentIndex: parent, productId: prdId }, r => {
      onSucc(r)
    })
  },
  saveProduct(planId, index, vals, onSucc) {
    Proposal.host.req('/proposal/plan/clause.json', { planId: planId, index: index, detail: vals }, r => {
      onSucc(r)
    })
  },
  editProduct(planId,channelId,orgCode,productId, index, onSucc) {
    Proposal.host.req('/proposal/plan/view_clause.json', { planId: planId,channelId:channelId,orgCode:orgCode,productId, index: index }, r => {
      onSucc(r)
    })
  },
  deleteProduct(planId, index, productId, onSucc) {
    Proposal.host.req('/proposal/plan/remove_clause.json', { planId: planId, index: index, productId: productId }, r => {
      onSucc(r)
    })
  },
  listRiders(planId,channelId,orgCode,productId, index, onSucc) {
    Proposal.host.req('/proposal/plan/list_riders.json', { planId: planId,channelId:channelId,orgCode:orgCode,productId, index: index }, r => {
      onSucc(r)
    })
  },
  format(planId, style, onSucc) {
    Proposal.host.req('/proposal/plan/format.json', { planId: planId, style: style }, r => {
      onSucc(r)
    })
  }
}
