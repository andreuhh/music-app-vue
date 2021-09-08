export default {
    beforeMount(el, binding) {
        const iconClass =`fa fa-${binding.value.icon} text-green-400 float-right text-2xl`;

        // if (binding.value.right) {
        //     iconClass += ' float-right';
        // }

        el.innerHTML += `<i class="${iconClass}"></i>`;

    },
}