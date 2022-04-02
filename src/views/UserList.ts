import { User, UserProps } from "../models/User";
import { CollectionView } from "./CollectionView";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, UserProps>{
    renderItem(model: User, itemParent: Element): void {
        const userShow = new UserShow(itemParent, model);
        userShow.render();
    }
}