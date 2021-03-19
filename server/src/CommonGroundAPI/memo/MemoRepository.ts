import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { Memo } from 'src/generated/memo-graphql'
import { MEMORepository } from '../MEMORepository'

interface CreateMemoInput {
    topic: string
    author: string
    name: string
    description: string
}

type MemoEntity = Pick<Memo, 'id' | 'name' | 'description' | 'author' | 'topic'>

@Injectable()
export class MemoRepository extends MEMORepository {
    public async createMemo(input: CreateMemoInput) {
        const result = await this.sdk.createMemo({
            input,
        })

        const memoObject = result?.createMemo?.memo
        assertNotNil(memoObject, `Failed to create memo`)

        memoObject.id = this.makeURLfromID(memoObject.id)

        return this.returnNonNullable(memoObject)
    }

    public async findByTopicAndAuthor(topic: string, author: string) {
        const result = await this.sdk.findMemosByTopicAndAuthor({ topic, author })

        const memoEdges = result.memos?.edges

        if (!memoEdges) {
            return []
        }

        const memoEntities: MemoEntity[] = memoEdges.map(memoEdge => {
            const memoNode = memoEdge?.node
            assertNotNil(memoNode)

            const id = memoNode.id
            assertNotNil(id)

            const name = memoNode.name
            assertNotNil(name)

            const description = memoNode.description
            assertNotNil(description)

            const author = memoNode.author
            assertNotNil(author)

            const topic = memoNode.topic
            assertNotNil(topic)

            return {
                id: this.makeURLfromID(id),
                name,
                description,
                author,
                topic,
            }
        })

        return memoEntities
    }
}
