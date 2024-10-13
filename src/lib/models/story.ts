export interface Story {
    id: string
    count: number
    creator: PublicUser
    assignee: PublicUser | undefined
    team: string | undefined
    project: string | undefined
    feature: string | undefined
    created: Date
    updated: Date
    closed: Date | undefined
    status: "icebox" | "in progress" | "in review" | "completed"
    title: string
    description: string
    estimation: StorypointEstimation | undefined
    acceptance_criteria: AcceptanceCriterium[] | undefined
}

export interface StorypointEstimation {
    complexity: number
    risk: number
    effort: number
}

export interface PublicUser {
    id: string
    username: string
    avatar: string
}

export interface AcceptanceCriterium {
    uuid: string
    description: string
    completed: boolean
}